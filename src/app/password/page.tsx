"use client"
import { Container } from "@/components"
import { usePasswordFormik } from "@/hooks"
import { Button, Input, Link, Spacer } from "@nextui-org/react"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import React, { useState } from "react"

const Page = () => {
    const formik = usePasswordFormik()

    const [isVisible, setIsVisible] = useState(false)

    return (
        <Container centerContent hasPadding>
            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset} className="w-full">
                <div className="text-2xl font-bold">Input your password</div>
                <Spacer y={12} />
                <Input
                    id="password"
                    label=""
                    size="lg"
                    labelPlacement="outside"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={!!(formik.touched.password && formik.errors.password)}
                    errorMessage={formik.touched.password && formik.errors.password}
                    type={isVisible ? "text" : "password"}
                    endContent={<Link type="button" color="foreground" as="button" onPress={() => setIsVisible(!isVisible)}>
                        {
                            isVisible ?
                                <EyeIcon className="w-5 h-5"/>
                                : <EyeSlashIcon className="w-5 h-5"/>
                        }</Link>}
                />
                <Spacer y={12} />
                <Button fullWidth color="primary" type="submit">
          Continue
                </Button>
            </form>
        </Container>
    )
}

export default Page