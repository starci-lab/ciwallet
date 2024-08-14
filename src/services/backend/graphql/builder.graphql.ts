import { DeepPartial } from "@apollo/client/utilities"

export type Scalar = object | string | number | boolean;
export type Atomic = Scalar | Array<Scalar>;

type SchemaRecursive<T> = T extends (infer U)[]
  ? { [V in keyof U]: SchemaRecursive<U[V]> }
  : T extends Record<string, Atomic>
  ? { [V in keyof T]: SchemaRecursive<T[V]> }
  : boolean;

export type Schema<T> = SchemaRecursive<T> extends Record<string, Atomic>
  ? SchemaRecursive<T>
  : Record<string, Atomic>;

export interface GraphQLParams<Input, SchemaType> {
  input: Input;
  schema: Schema<DeepPartial<SchemaType>>;
}

export const buildPayloadString = <SchemaType extends object>(
    schema?: Schema<SchemaType>,
    currentPath: Array<string> = []
): string => {
    if (!schema) {
        return ""
    }

    const keys = Object.keys(schema)
    const trueKeys = keys.filter((key, index) => {
        const value = schema[key]
        if (typeof value === "boolean") {
            if (schema[key]) {
                currentPath.push(key)
                if (index !== keys.length - 1) {
                    currentPath.push(" ")
                }
            }
        } else {
            currentPath.push(key)
            currentPath.push("{")
            buildPayloadString(value as Record<string, Atomic>, currentPath)
            currentPath.push("}")
        }
    })

    if (trueKeys.length) {
        for (let i = 0; i < trueKeys.length; i++) {
            currentPath.push(trueKeys[i])
            if (i !== trueKeys.length - 1) currentPath.push(",")
        }
    }

    return currentPath.join(" ")
}
