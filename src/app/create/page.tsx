"use client"
import { Container } from "@/components"
import React, { useEffect } from "react"
import { downloadTextFile } from "@/services"
import { setMnemonic, useAppDispatch, useAppSelector } from "@/redux"
import { Button, Snippet, Spacer } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { constantConfig } from "@/config"
import { getMnemonic } from "@/services"

const Page = () => {
    const dispatch = useAppDispatch()
    const mnemonic = useAppSelector((state) => state.authReducer.mnemonic)
    
    useEffect(() => {
        const mnemonic = getMnemonic()
        dispatch(setMnemonic(mnemonic))
    }, [])

    const router = useRouter()

    return (
        <Container hasPadding centerContent>
            <div className="w-full">
                <Snippet
                    hideSymbol
                    classNames={{ pre: "text-justify !whitespace-pre-line" }}
                    className="w-full"
                >
                    {mnemonic || "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum"}
                </Snippet>
                <Spacer y={12} />        
                <Button onPress={() => router.push(constantConfig().path.preference)} color="primary" fullWidth>
          Continue
                </Button>
                <Spacer y={2} />
                <Button
                    onPress={() =>
                        downloadTextFile("mnemonic.txt", mnemonic)
                    }
                    color="primary"
                    variant="bordered"
                    fullWidth
                >
          Save
                </Button>
            </div>
        </Container>
    )
}

export default Page
