"use client"
import { Container } from "@/components"
import React, { useEffect } from "react"
import { downloadTextFile } from "@/services"
import { setMnemonic, useAppDispatch, useAppSelector } from "@/redux"
import { Button, Skeleton, Snippet, Spacer } from "@nextui-org/react"
import useSWRMutation from "swr/mutation"
import { getMnemonic } from "@/services"
import { useRouter } from "next/navigation"
import { constantConfig } from "@/config"

const Page = () => {
    const dispatch = useAppDispatch()
    const mnemonic = useAppSelector((state) => state.authReducer.mnemonic)
    
    const { trigger, isMutating } = useSWRMutation("MNEMONIC", async () => await getMnemonic())
    
    useEffect(() => {
        const handleEffect = async () => {
            const mnemonic = await trigger()
            dispatch(setMnemonic(mnemonic))
        }
        handleEffect()
    }, [])

    const router = useRouter()

    return (
        <Container hasPadding centerContent>
            <div className="w-full">
                <Skeleton isLoaded={!(isMutating || mnemonic === "")} className="rounded-medium">
                    <Snippet
                        hideSymbol
                        classNames={{ pre: "text-justify !whitespace-pre-line" }}
                        className="w-full"
                    >
                        {mnemonic || "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum"}
                    </Snippet>
                </Skeleton>
                <Spacer y={12} />
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
                <Spacer y={2} />
                <Button onPress={() => router.push(constantConfig().path.preference)} color="primary" fullWidth>
          Continue
                </Button>
            </div>
        </Container>
    )
}

export default Page
