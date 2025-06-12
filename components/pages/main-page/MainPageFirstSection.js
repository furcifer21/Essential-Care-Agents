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
                            ACA health insurance plans, also known as Affordable Care Act plans or Obamacare
                            plans, are government-regulated health insurance options designed to provide
                            affordable and comprehensive coverage to individuals and families.
                        </p>
                        <p className="mb-4 mb-xl-5">
                            These plans offer essential health benefits, including preventive care, prescription
                            medications, hospitalization, and mental health services. ACA plans are available
                            through state-based marketplaces and often offer subsidies and cost-sharing
                            reductions to make coverage more affordable for eligible individuals.
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
