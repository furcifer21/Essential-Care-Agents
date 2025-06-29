import React from "react";
import MainLayout from "../../../components/MainLayout";
import ResetForm from "../../../components/pages/cabinet-page/ResetForm";

export const metadata = {
    title: 'Reset password',
    description: '',
};



export default function ResetPasswordPage() {
    return (
        <MainLayout>
            <ResetForm/>
        </MainLayout>
    );
}
