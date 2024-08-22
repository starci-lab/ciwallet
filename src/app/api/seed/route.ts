import { envConfig } from "@/config"
import { mnemonicToSeed } from "@/services"
import { NextRequest, NextResponse } from "next/server"

import "@/config/server-env.config"

export const POST = async (request: NextRequest) => {
    const { mnemonic, accountNumber } = await request.json()
    const seed = mnemonicToSeed({
        mnemonic,
        password: accountNumber.toString(),
        salt: envConfig().appSalt,
    })
    return new NextResponse(seed.toString("base64"), {
        status: 201,
    })
}
