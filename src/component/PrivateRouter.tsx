import React from 'react'
import { Navigate } from 'react-router-dom'
import { auth } from '../config/Firebase'
type Props = {
    children: React.ReactNode
}
const PrivateRouter = ({ children }: Props) => {
    if (auth.currentUser?.uid!=undefined) {
        return (
            <>{children}</>
        )
    }
    return <Navigate to={"/"} />
}

export default PrivateRouter