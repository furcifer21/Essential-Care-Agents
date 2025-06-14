import React from "react";
import ContractingForm from "../../../components/pages/contracting-page/ContractingForm";
import InsuranceSection from "../../../components/pages/contracting-page/InsuranceSection";
import MainLayout from "../../../components/MainLayout";
import axios from "axios";
import {API_URL, IMAGE_API_URL} from "../../../components/constants";
import Link from "next/link";

export const metadata = {
    title: 'Aca New Consent Policy',
    description: '',
};

export default async function AcaNewConsentPolicyPage() {
    return (
        <MainLayout>
            <section className="certification-section-main section-margin py-4">
                <div className="container d-flex align-items-center justify-content-center">
                    <div className="text-center">
                        <h1 className="mb-4 pb-3">
                            Key Update: HHS Implements New Consent Policy for ACA Plan Enrollments
                        </h1>
                        <h2>HHS Announces New Consent Documentation Requirements for ACA Enrollments – Effective June 18, 2023</h2>
                    </div>
                </div>
            </section>

            <section className="insurance-section section-margin position-relative pt-3">
                <div className="container insurance-item px-5 py-5">
                  <p className="mb-3">
                    The Department of Health and Human Services (HHS) - the regulatory authority overseeing Individual and Family Plans
                    (IFP), also known as ACA plans - has issued its annual policy updates. A significant change taking effect on
                    June 18, 2023, impacts how agents, brokers, and web-brokers operate when enrolling consumers in health coverage
                    through Federally Facilitated Exchanges (FFEs) or State-Based Exchanges (SBEs), and when assisting with applications
                    for Advanced Premium Tax Credits (APTC) and Cost-Sharing Reductions (CSRs) for Qualified Health Plans (QHPs).
                  </p>
                  <p className="fw-bolder mb-3">What’s Changing?</p>
                  <p className="mb-3">While consumer consent has always been a requirement, starting June 18, 2023, all registered agents and brokers
                    must now document consumer consent before accessing or updating any Marketplace account information.</p>
                  <p className="mb-3">
                    The Centers for Medicare & Medicaid Services (CMS) does not dictate a specific format for recording consent. Instead, agents
                    and brokers may use a variety of methods, including:
                  </p>
                  <ul>
                    <li>Recorded phone calls</li>
                    <li>Text messages</li>
                    <li>Emails</li>
                    <li>Signed electronic documents</li>
                    <li>Hardcopy forms with handwritten signatures</li>
                  </ul>
                  <p className="fw-bolder mt-3 mb-3">Required Elements of Consent Documentation:</p>
                  <p className="mb-3">
                    To be valid, the documentation must clearly include:
                  </p>
                  <ul>
                    <li>The date consent was given</li>
                    <li>The full name of the consumer or their authorized representative</li>
                    <li>The name of the agent, broker, web-broker, or agency receiving consent</li>
                    <li>A description outlining the purpose, scope, and duration of the consent</li>
                    <li>Instructions for how the consumer can revoke their consent</li>
                  </ul>
                  <p className="mt-3 mb-3">
                    A sample consent form provided by CMS/HHS is available for download to assist with compliance.
                  </p>
                  <p className="fw-bolder mb-3">Why This Policy Is Being Implemented:</p>
                  <p className="mb-3">This update is designed to:</p>
                  <ul>
                    <li>Prevent unauthorized access and modifications to consumer accounts</li>
                    <li>Ensure transparency about who is managing a consumer’s enrollment</li>
                    <li>Address increasing concerns about Agent of Record disputes</li>
                    <li>Reduce incidents of fraudulent enrollments, which waste federal and state funding</li>
                  </ul>
                  <p className="mt-3 mb-3">
                    This new requirement emphasizes the importance of consumer awareness and participation in the
                    enrollment process and reinforces ethical conduct among agents and brokers.
                  </p>
                </div>
            </section>
        </MainLayout>
    );
}

