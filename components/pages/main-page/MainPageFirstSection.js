"use client";

import Link from "next/link";
import Image from "next/image";
import React, {useEffect} from "react";

export default function MainPageFirstSection() {
    useEffect(() => {
        const container = document.getElementById('animationCard');
        let animation;

        if (container && window.bodymovin) {
            try {
                animation = window.bodymovin.loadAnimation({
                    container: container,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    path: 'https://lottie.host/79ee908f-24b5-4f4a-b65a-b3f456b5b347/yc0OjyLfUs.json'
                });
            } catch (error) {
                console.error('Failed to load animation:', error);
            }
        }

        return () => {
            if (animation) {
                animation.destroy();
            }
        };
    }, []);

    return (
        <section className="section-margin">
            <div className="container">
                <div className="main-section d-xl-flex ">
                    <div className="text-center text-xl-start">
                        <h1 className="mb-4">Licensed Agents and Brokers <br/>for ACA (Affordable Care Act) Health Plans</h1>
                        <p className="mb-4 mb-xl-5">
                            ACA health insurance plans, commonly referred to as Affordable Care Act (ACA) or Obamacare plans, are health coverage options overseen by the government. They are intended to deliver both affordable and comprehensive medical insurance to individuals and families.
                        </p>
                        <p className="mb-4 mb-xl-5">
                            These plans provide a broad range of essential health benefits, including preventive services, prescription drug coverage, hospital care, and mental health support. Available through state-run insurance marketplaces, ACA plans frequently include financial assistance such as premium subsidies and cost-sharing reductions for those who meet eligibility requirements.
                        </p>
                        <Link href={`/aca-contracting`} className="btn-basic">ACA Contracting</Link>
                    </div>
                    <div className="main-section-img position-relative mt-4" id={"animationCard"}>
                        <Image src={`/images/IMG-1.svg`}
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
