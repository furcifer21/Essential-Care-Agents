import Image from "next/image";
import React from "react";

export default function BenefitsBlock() {
    const benefitsArr = [
        {
            title: 'FAST',
            items: [
                '1) No redirect to HC.gov',
                '2) No more waiting rooms',
                '3) No more 3-way calls with CMS',
                '4) Pre-populated renewal apps',
            ],
        },
        {
            title: 'AUTOMATED',
            items: [
                '1) Bulk email marketing',
                '2) Branded enrollment site for your self‑serve clients',
            ],
        },
        {
            title: 'QUOTE & ENROLL',
            items: [
                '1) Shop and enroll from one site',
                '2) Eligibility notices',
                '3) Drug & provider search',
            ],
        },
        {
            title: 'MANAGE',
            items: [
                '1) Upload documents for clients',
                '2) Resolve DMIs & upload docs',
                '3) Real-time status & notifications',
                '4) Make first payment',
                '5) Report life changes',
                '6) Document retrieval (e.g. 1095As)',
                '7) Add any Marketplace client',
            ],
        },
        {
            title: 'MORE',
            items: [
                '1) Maintain consumer relationship',
                '2) Year-round technology support',
                '3) Track client activity',
                '4) Referral bonus program',
                '5) Reporting & analytics',
            ],
        },
    ]
    return (
        <section className="benefits-section certification-links-section section-margin">
            <div className="container">
                <h2 className="mb-5 text-center">Benefits of using <span className="fw-bold">HealthSherpa</span></h2>
                <div className="row justify-content-center">
                    <div className="col-10 col-md-5">
                        {benefitsArr.slice(0, 3).map((item, i) => {
                            return (
                                <div key={`benifits-item-${i}`} className="mb-3">
                                    <h4>{item.title}</h4>
                                    <ul className="list-unstyled p-0">
                                        {item.items.map((li, k) => {
                                            return (
                                                <li key={`benifits-item-li-${k}`}>{li}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            )
                        })}
                    </div>
                    <div className="col-10 col-md-5">
                        {benefitsArr.slice(3).map((item, i) => {
                            return (
                                <div key={`benifits-item-right-${i}`}>
                                    <h4>{item.title}</h4>
                                    <ul className="list-unstyled p-0">
                                        {item.items.map((li, k) => {
                                            return (
                                                <li key={`benifits-item-li-right-${k}`}>{li}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
