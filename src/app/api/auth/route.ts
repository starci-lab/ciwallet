import { generateMnemonic } from "@/services"
import { NextResponse } from "next/server"

export const POST = async () => {
    const mnemonic = generateMnemonic()
    return new NextResponse(JSON.stringify({ mnemonic }), {
        status: 201,
    })
}
