'use client';
import React from "react";
import CollapseComponent from "./CollapseComponent";

export default function MainPageThirdBlock() {
    const factsData = [
        {
            title: 'When is the ACA Open Enrollment Period? (OEP) ',
            text1: 'The ACA open enrollment period typically runs from November 1st to December 15th each year. However, it’s important to note that specific dates can vary from year to year. It is advisable to check the official Health Insurance Marketplace or healthcare.gov for the most up-to-date information regarding the exact dates of the open enrollment period for ACA insurance plans.',
            text2: 'Additionally, individuals may be eligible for a Special Enrollment Period (SEP) outside of the open enrollment period if they experience certain qualifying life events, such as getting married, having a baby, or losing other health coverage. Professionally paraphrased, no plagiarism.',
            text3: ''
        },
        {
            title: 'What Is a Special Enrollment Period (SEP)?',
            text1: 'A Special Enrollment Period (SEP) under the Affordable Care Act (ACA) is a designated time outside the standard Open Enrollment Period when individuals can sign up for or modify their health insurance plans. These periods become available following specific qualifying life events that may impact a person’s health coverage requirements.',
            text2: 'Common qualifying events include marriage, childbirth or adoption, loss of other health insurance, relocating to a new area, or income changes that affect eligibility for financial assistance. During a SEP, individuals typically have a limited timeframe to make necessary changes or enroll in coverage that suits their updated situation.',
            text3: 'In most cases, supporting documentation is required to confirm the qualifying event and validate SEP eligibility.'
        },
        {
            title: 'What ACA Insurance Plans Offer?',
            text1: 'ACA health insurance plans provide a wide range of essential health benefits, including preventive care, prescription medications, maternity and newborn care, mental health services, and emergency treatment. These benefits are designed to give individuals and families access to comprehensive medical coverage.',
            text2: 'A key feature of ACA plans is that coverage cannot be denied or priced higher based on pre-existing medical conditions. This ensures that individuals with a history of health issues can still obtain insurance without facing discrimination or increased premiums.',
            text3: 'In addition, many ACA plans include financial assistance, such as subsidies and premium tax credits, which help lower the cost of coverage. These savings are income-based and are intended to make health insurance more accessible and affordable for those who qualify.'
        },
        {
            title: 'Grow Your Client Network & Boost Your Earnings',
            text1: 'Broader Market Access: By including ACA health insurance plans in your portfolio, agents and brokers can engage a wide-ranging audience of individuals and families in need of reliable, full-spectrum health coverage. This allows you to expand your reach, connect with new prospects, and increase your overall client base.',
            text2: 'Earning Potential: Selling ACA plans offers a financially rewarding opportunity, with agents and brokers earning commissions and other forms of compensation for each enrollment. This creates a consistent revenue stream and enhances your long-term business growth.',
            text3danger: 'Beyond commissions, offering ACA plans enables agents to:<ul><li>Reach underserved markets</li><li>Demonstrate regulatory and compliance knowledge</li><li>Strengthen client trust and loyalty</li><li>Help clients secure subsidies and lower healthcare costs</li></ul>Incorporating ACA plans into your offerings is a smart strategy to increase income, build credibility, and enhance your value as a trusted insurance advisor.'
        },
    ];

    return (
        <section className="section-margin">
            <div className="container">
                <div className="main-section d-xl-flex align-items-center">
                    <div className="text-center text-xl-start">
                        <h2 className="mb-4">ACA Facts: <br/>What You Should Know</h2>
                    </div>
                    <div className="mt-4 mx-4 mx-xl-0">
                        {factsData.map((item, i) => {
                            return (
                                <CollapseComponent key={`collapse-${i}`} title={item.title}>
                                    {item.text1 !== '' &&
                                      <p>{item.text1}</p>
                                    }
                                    {item.text1danger !== '' &&
                                      <p dangerouslySetInnerHTML={{__html: item.text1danger}}></p>
                                    }
                                    {item.text2 !== '' &&
                                        <p>{item.text2}</p>
                                    }
                                    {item.text2danger !== '' &&
                                      <p dangerouslySetInnerHTML={{__html: item.text2danger}}></p>
                                    }
                                    {item.text3 !== '' &&
                                        <p>{item.text3}</p>
                                    }
                                    {item.text3danger !== '' &&
                                        <p dangerouslySetInnerHTML={{__html: item.text3danger}}></p>
                                    }
                                </CollapseComponent>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
