"use client";

import React from "react";
import FormBlock from "./FormBlock";
import {IMAGE_API_URL} from "../../constants";

export default function ContractingForm({insuranceData}) {
    return (
        <section className="contract-form-section section-margin">
            <div className="container">
                <h1 className="mb-4 pb-2 text-center">ACA Contracting & Appointment</h1>
                <p className="mb-4 pb-2 text-center">
                    Carriers are expanding! Protect your book of business & support your clients by adding
                    ACA contracting through Essential! Select your requested carriers and complete the fields below.
                </p>
                <div className="contract-form-wrap d-xl-flex">
                    <FormBlock insuranceData={insuranceData}  />
                    <div className="contract-logos d-flex flex-xl-column flex-shrink-0 mt-4 mt-xl-0">
                        {insuranceData.map((carrier) => {
                            return (
                                <div key={`logo-${carrier.id}`} className="contract-logos__item flex-shrink-0 position-relative d-flex align-items-center justify-content-center">
                                    <img src={IMAGE_API_URL + carrier.logo}
                                           alt={carrier.name + ' logo'}
                                           style={{
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                width: 'auto',
                                                height: 'auto',
                                                objectFit: 'contain'
                                           }}
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
