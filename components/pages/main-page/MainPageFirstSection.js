import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function MainPageFirstSection() {
    return (
        <section className="section-margin">
            <div className="container">
                <div className="main-section d-xl-flex ">
                    <div className="text-center text-xl-start">
                        <h1 className="mb-4">Agent & Broker <br/>ACA (Obamacare) Plans</h1>
                        <p className="mb-4 mb-xl-5">
                            ACA health insurance plans, also known as Affordable Care Act plans or Obamacare plans, are
                            government-regulated health insurance options designed to provide affordable and
                            comprehensive coverage to individuals and families.
                        </p>
                        <p className="mb-4 mb-xl-5">
                            These plans offer essential health benefits, including preventive care, prescription
                            medications, hospitalization, and mental health services. ACA plans are available through
                            state-based marketplaces and often offer subsidies and cost-sharing reductions to make
                            coverage more affordable for eligible individuals.
                        </p>
                        <Link href={`/aca-contracting`} className="btn-basic">ACA Contracting</Link>
                    </div>
                    <div className="main-section-img position-relative mt-4">
                        <Image src={`/images/Medicare-for-Agents.gif`}
                               fill
                               alt="ACA Plans"
                               objectFit="contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
