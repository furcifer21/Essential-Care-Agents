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
                        <h2 className="mb-4">Advantages of Offering ACA Health Insurance Plans to Your Clients</h2>
                        <p className="mb-4 mb-xl-5">
                            ACA (Affordable Care Act), or Obamacare, health insurance plans are highly valued for their broad coverage and financial protection against significant healthcare expenses. These plans include essential benefits such as preventive care, prescription medications, and mental health services, ensuring that individuals receive critical healthcare access.
                        </p>
                        <p className="mb-4 mb-xl-5">
                            One of the key strengths of ACA plans is their guaranteed coverage—insurance providers are not allowed to deny enrollment or increase rates based on pre-existing medical conditions. This makes them a particularly attractive option for clients with ongoing health needs.
                        </p>
                        <p className="mb-4 mb-xl-5">
                            For insurance professionals, selling ACA plans presents a strong business opportunity. Agents can earn commissions through the ACA marketplace, creating a consistent revenue stream. Given the millions of Americans who sign up for these plans each year, the demand provides a robust market for agents to serve.
                        </p>
                        <p className="mb-4 mb-xl-5">
                            Additionally, ACA plans often come with premium subsidies and cost-sharing assistance for qualifying individuals, making coverage more affordable and accessible. By guiding clients through these financial benefits, agents not only help reduce clients’ healthcare costs but also build trust, enhance client satisfaction, and grow their book of business.
                        </p>
                        <Link href={`/aca-certification`} className="btn-basic">ACA Certifications</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
