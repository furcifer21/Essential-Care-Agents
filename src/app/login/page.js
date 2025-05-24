import React from "react";
import MainLayout from "../../../components/MainLayout";
import LoginForm from "../../../components/pages/cabinet-page/LoginForm";

export const metadata = {
    title: 'Login',
    description: '',
};

export default function LoginPage() {
    return (
        <MainLayout>
            <LoginForm/>
        </MainLayout>
    );
}
