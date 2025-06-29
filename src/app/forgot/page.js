import React from "react";
import MainLayout from "../../../components/MainLayout";
import ForgotForm from "../../../components/pages/cabinet-page/ForgotForm";

export const metadata = {
    title: 'Forgot Password Page',
    description: '',
};

export default function ForgotPage() {
    return (
        <MainLayout>
            <ForgotForm/>
        </MainLayout>
    );
}
