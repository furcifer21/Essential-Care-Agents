'use client'
import React, {useEffect, useRef, useState} from "react";
import Loader from "./Loader";
import {usePathname} from "next/navigation";

export default function PageLoader() {
    const pathname = usePathname()
    const [loading, setLoading] = useState(false)
    const timeoutId = useRef(null)

    useEffect(() => {
        setLoading(true)
        timeoutId.current = setTimeout(() => {
            setLoading(false)
        }, 500)

        return () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current)
                timeoutId.current = null
            }
        }
    }, [pathname])

    return (
        <>
            {loading && (
                <div className="page-loader-mask position-fixed w-100 h-100">
                    <Loader size={80} />
                </div>
            )}
        </>
    )
}