import React from "react";
import Image from "next/image";
import FormBlock from "./FormBlock";

export default function ContractingForm() {
    const  ACACarriersLogos = [
        'cigna-logo.png',
        'cigna-logo.png',
        'cigna-logo.png',
        'cigna-logo.png',
        'cigna-logo.png',
        'cigna-logo.png',
        'cigna-logo.png',
        'cigna-logo.png',
        'cigna-logo.png',
        'cigna-logo.png'
    ];

    return (
        <section className="contract-form-section section-margin">
            <div className="container">
                <h1 className="mb-4 pb-2 text-center">ACA Contracting & Appointment</h1>
                <p className="mb-4 pb-2 text-center">
                    Carriers are expanding! Protect your book of business & support your clients by adding
                    ACA contracting through Essential! Select your requested carriers and complete the fields below.
                </p>
                <div className="contract-form-wrap d-xl-flex">
                    <FormBlock/>
                    <div className="contract-logos d-flex flex-xl-column flex-shrink-0 mt-4 mt-xl-0">
                        {ACACarriersLogos.map((logo, i) => {
                            return (
                                <div key={`logo-${i}`} className="contract-logos__item flex-shrink-0 position-relative d-flex align-items-center justify-content-center">
                                    <Image src={`/images/logo.png`}
                                           fill
                                           alt={`logo ${i}`}
                                           objectFit="contain"
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
