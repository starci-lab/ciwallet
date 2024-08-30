import { toast } from "react-hot-toast"
import { v4 } from "uuid"
import React from "react"
import { WithClose } from "./with-close.toast"

export const triggerInvalidPasswordToast = () => {
    const toastId = v4()
    toast.error(
        <WithClose toastId={toastId}>
            <div className="text-sm">Invalid password</div>
        </WithClose>,
        {
            id: toastId,
        }
    )
}
