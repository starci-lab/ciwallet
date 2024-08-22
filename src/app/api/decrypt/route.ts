import { DecryptMnemonicParams, decrypt } from "@/services"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest) => {
    const {
        encryptedResult: { data, iv },
        password,
    } = (await request.json()) as DecryptMnemonicParams
    const mnemonic = decrypt({
        key: password,
        iv,
        encryptedData: data,
    })

    return new NextResponse(mnemonic, {
        status: 201,
    })
}
