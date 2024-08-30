import React, { PropsWithChildren } from "react"

interface ContainerProps extends PropsWithChildren {
  hasPadding?: boolean;
  centerContent?: boolean;
}

export const Container = ({
    children,
    hasPadding,
    centerContent,
}: ContainerProps) => {
    return (
        <div
            className={`max-w-[400px] mx-auto ${hasPadding ? "p-6" : ""} ${
                centerContent ? "grid place-items-center" : ""
            } h-screen`}
        >
            {children}
        </div>
    )
}
