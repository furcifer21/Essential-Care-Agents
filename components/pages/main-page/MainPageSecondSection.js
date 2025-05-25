import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function MainPageSecondSection() {
    return (
        <section className="section-margin with-bg">
            <div className="container">
                <div className="main-section d-flex flex-column-reverse flex-xl-row">
                    <div className="main-section-img position-relative">
                        <Image src={`/images/IMG-2-1000x.png`}
                               fill
                               alt="ACA Carrier Contracting"
                               objectFit="contain"
                        />
                    </div>
                    <div className="text-center text-xl-start">
                        <h2 className="mb-4">The Benefits of Selling aCA Insurance Plans to your clients.</h2>
                        <p className="mb-4 mb-xl-5">
                            ACA health insurance plans, also known as Obamacare plans, are beneficial due to
                            their comprehensive coverage and protection against high medical costs. These
                            plans provide essential health benefits, including preventive care, prescription
                            drugs, and mental health services, ensuring individuals have access to necessary
                            healthcare.
                        </p>
                        <p className="mb-4 mb-xl-5">
                            Additionally, ACA plans prohibit insurance companies from denying coverage or
                            charging higher premiums based on pre-existing conditions, making them a
                            valuable option for individuals with health concerns.
                        </p>
                        <p className="mb-4 mb-xl-5">
                            Furthermore, selling ACA health insurance plans can be financially advantageous
                            for insurance agents. The ACA marketplace offers agents the opportunity to earn
                            commissions on plan sales, providing a potential source of steady income. With
                            millions of individuals enrolling in ACA plans each year, there is a large market
                            for agents to tap into.
                        </p>
                        <p className="mb-4 mb-xl-5">
                            Moreover, ACA plans often include subsidies and cost-sharing reductions for eligible
                            individuals, making the coverage more affordable and attractive to potential clients.
                            By selling ACA plans, agents can leverage these subsidies and cost-sharing benefits
                            to help their clients find affordable coverage, enhancing their reputation and client
                            base.
                        </p>
                        <Link href={`/aca-certification`} className="btn-basic">ACA Certifications</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
