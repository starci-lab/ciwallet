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
            className={`${hasPadding ? "p-4" : ""} ${
                centerContent ? "grid place-items-center" : ""
            } h-screen`}
        >
            {children}
        </div>
    )
}
