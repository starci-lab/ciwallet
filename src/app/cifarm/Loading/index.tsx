import { useCifarmDb } from "@/hooks"
import { useAppSelector } from "@/redux"
import { Avatar, Image, Progress, Spacer } from "@nextui-org/react"
import React from "react"

export const Loading = () => {
    const chains = useAppSelector((state) => state.blockchainReducer.chains)
    const preferenceChainKey = useAppSelector(
        (state) => state.blockchainReducer.preferenceChainKey
    )
    const { loader, framework, data, wasm } = useCifarmDb()
    console.log({ loader, framework, data, wasm })
    return (
        <div className="absolute w-full h-full place-items-center grid">
            <div className="grid place-items-center gap-4 w-full relative">
                <div className="relative">
                    <Avatar
                        isBordered
                        src={chains[preferenceChainKey]?.imageUrl}
                        classNames={{
                            base: "absolute w-20 h-20 bottom-0 right-0 z-20 ring-0 bg-background",
                        }}
                    />
                    <Image
                        radius="full"
                        removeWrapper
                        src={"/icons/cifarm.png"}
                        className="w-[160px] h-[160px]"
                    />
                </div>
                <div>
                    <Progress
                        label="Downloading Data"
                        className="w-[300px]"
                        showValueLabel
                        value={1*100}
                    />
                    <Spacer y={1.5}/>
                    <div className="text-xs text-warning">Please be patient, the first load may take a little longer. </div>
                </div>
            </div>
        </div>
    )
}