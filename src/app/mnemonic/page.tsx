"use client"
import { Container } from "@/components"
import React, { useEffect, useState } from "react"
import { MnemonicWords, downloadTextFile } from "@/services"
import {
    addAlgorandMnemonic,
    setMnemonic,
    useAppDispatch,
    useAppSelector,
} from "@/redux"
import {
    Avatar,
    AvatarGroup,
    Button,
    Snippet,
    Spacer,
    Tab,
    Tabs,
} from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { constantConfig } from "@/config"
import { getMnemonic } from "@/services"

const Page = () => {
    const dispatch = useAppDispatch()
    const mnemonic = useAppSelector((state) => state.authReducer.mnemonic)
    const algorandMnemonic = useAppSelector(
        (state) => state.authReducer.algorandMnemonics[0]
    )
    const [use24Words, setUse24Words] = useState(true)

    const x = useAppSelector((state) => state.authReducer.algorandMnemonics)
    console.log(x)

    useEffect(() => {
        const mnemonic = getMnemonic(
            use24Words ? MnemonicWords._24_WORDS : MnemonicWords._12_WORDS
        )
        dispatch(setMnemonic(mnemonic))
    }, [use24Words])

    useEffect(() => {
    //add algorand mnemonic
        const mnemonic = getMnemonic(MnemonicWords._25_WORDS)
        dispatch(addAlgorandMnemonic(mnemonic))
    }, [])

    const router = useRouter()

    const chains = Object.values(
        useAppSelector((state) => state.blockchainReducer.chains)
    ).filter((chain) => chain.key !== "algorand")
    const algorandChain = Object.values(
        useAppSelector((state) => state.blockchainReducer.chains)
    ).filter((chain) => chain.key === "algorand")[0]

    return (
        <Container hasPadding centerContent>
            <div className="w-full">
                <div className="text-2xl font-bold">Mnemonic</div>
                <Spacer y={6} />
                <div>
                    <div>
                        <div className="flex gap-2">
                            <AvatarGroup>
                                {chains.map((chain) => (
                                    <Avatar
                                        key={chain.key}
                                        classNames={{
                                            base: "w-5 h-5 bg-background",
                                        }}
                                        src={chain.imageUrl}
                                    />
                                ))}
                            </AvatarGroup>
                            <div className="text-sm">{chains.length}+ chains</div>
                        </div>
                        <Spacer y={2} />
                        <Snippet
                            hideSymbol
                            classNames={{ pre: "text-justify !whitespace-pre-line" }}
                            className="w-full min-h-[100px]"
                        >
                            {mnemonic ||
                "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum"}
                        </Snippet>
                    </div>
                    <Spacer y={1.5} />
                    <div className="flex gap-2 items-center">
                        <Tabs
                            selectedKey={use24Words ? "24words" : "12words"}
                            onSelectionChange={(key) => setUse24Words(key === "24words")}
                            size="sm"
                        >
                            <Tab key="12words" title="12 words" />
                            <Tab key="24words" title="24 words" />
                        </Tabs>
                        <div className="text-xs text-warning">
              Use a 24-word mnemonic for better security
                        </div>
                    </div>
                </div>
                <Spacer y={6} />
                <div>
                    <div className="flex gap-2">
                        <AvatarGroup>
                            <Avatar
                                key={algorandChain.key}
                                classNames={{
                                    base: "w-5 h-5 bg-background",
                                }}
                                src={algorandChain.imageUrl}
                            />
                        </AvatarGroup>
                        <div className="text-sm">Algorand</div>
                    </div>

                    <Spacer y={1.5} />
                    <Snippet
                        hideSymbol
                        classNames={{ pre: "text-justify !whitespace-pre-line" }}
                        className="w-full min-h-[100px]"
                    >
                        {algorandMnemonic ||
              "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum lorem"}
                    </Snippet>
                </div>
                <Spacer y={12} />
                <Button
                    onPress={() => router.push(constantConfig().path.preference)}
                    color="primary"
                    fullWidth
                >
          Continue
                </Button>
                <Spacer y={2} />
                <Button
                    onPress={() =>
                        downloadTextFile(
                            "mnemonic.txt",
                            `4+ chains: ${mnemonic}
Algorand: ${algorandMnemonic}`
                        )
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
