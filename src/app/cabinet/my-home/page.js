"use client";

import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import MainLayout from "../../../../components/MainLayout";
import Form404 from "../../../../components/pages/cabinet-page/Form404";
import { useAuthStore } from "../../../../components/storage";

export default function MyHomePage() {
    const {token, user, isHydrated} = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!isHydrated) {
            // Ждем, пока Zustand восстановит состояние
            return;
        }
        if (!token) {
            router.push('/login');
        }

    }, [token, router, isHydrated]);

    return (
        <MainLayout isAuth>
            <Form404/>
        </MainLayout>
    );
}
