import React from "react";
import MainLayout from "../../../components/MainLayout";
import Image from "next/image";
import JoinBlock from "../../../components/pages/healthSherpa-page/JoinBlock";
import BenefitsBlock from "../../../components/pages/healthSherpa-page/BenefitsBlock";
import StatsBlock from "../../../components/pages/healthSherpa-page/StatsBlock";
import Link from "next/link";
import VideoBlock from "../../../components/pages/healthSherpa-page/VideoBlock";
import StepsBlock from "../../../components/pages/healthSherpa-page/StepsBlock";

export const metadata = {
    title: 'HealthSherpa Login and Access Code',
    description: '',
};

export default function HealthSherpaPage() {
    return (
        <MainLayout>
            <section className="certification-section-main section-margin mb-4 mb-md-5">
                <div className="container d-flex align-items-center justify-content-center">
                    <div className="text-center my-4">
                        <h1 className="mb-3">HealthSherpa</h1>
                        <h2>ACA Enhanced Direct Enrollment Platform</h2>
                    </div>
                </div>
            </section>
            <JoinBlock/>
            <BenefitsBlock/>
            <StatsBlock/>
            <div className="certification-other-resources">
                <div className="container d-flex flex-column align-items-center justify-content-center">
                    <h2 className="mb-3 text-center">How to Create an Agent Account to Enroll ACA Clients:</h2>
                    <p className="text-orange mb-0 fw-bold text-center">To get started, follow the link above & then the steps below</p>
                </div>
            </div>
            <VideoBlock/>
            <StepsBlock/>
        </MainLayout>
    );
}
