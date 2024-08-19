import { encrypt } from "@/services"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest) => {
    const { password, mnemonic } = await request.json()
    const encryptedMnemonic = encrypt({
        key: password,
        data: mnemonic,
    })
    return new NextResponse(JSON.stringify(encryptedMnemonic), {
        status: 201,
    })
}


