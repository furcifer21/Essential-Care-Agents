'use client'
import React, {Suspense} from "react";
import MainLayout from "../../../components/MainLayout";
import TokenForm from "../../../components/pages/cabinet-page/TokenForm";

export default function TokenPage() {
    return (
        <MainLayout>
            <Suspense fallback={<div>Loading...</div>}>
                <TokenForm/>
            </Suspense>
        </MainLayout>
    );
}
