export interface RunHookProps {
    hook: (...params: Array<unknown>) => unknown
}
export const RunHook = ({ hook }: RunHookProps) => {
    return hook()
}