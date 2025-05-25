'use client';
import React from "react";
import CollapseComponent from "./CollapseComponent";

export default function MainPageThirdBlock() {
    const factsData = [
        {
            title: 'When Is The ACA Open Enrollment Period? (OEP)',
            text1: 'The ACA open enrollment period typically runs from November 1st to December 15th each year. However, it’s important to note that specific dates can vary from year to year. It is advisable to check the official Health Insurance Marketplace or healthcare.gov for the most up-to-date information regarding the exact dates of the open enrollment period for ACA insurance plans.',
            text2: 'Additionally, individuals may be eligible for a Special Enrollment Period (SEP) outside of the open enrollment period if they experience certain qualifying life events, such as getting married, having a baby, or losing other health coverage.',
            text3: ''
        },
        {
            title: 'What is A Special Enrollment Period? (SEP)',
            text1: 'An ACA Special Enrollment Period (SEP) is a time outside of the regular open enrollment period during which individuals can enroll in or make changes to their ACA health insurance plans. SEPs are triggered by certain qualifying life events that may affect an individual’s healthcare coverage needs.',
            text2: 'Examples of qualifying life events include getting married, having a baby, losing other health coverage, moving to a new area, or experiencing changes in household income that affect eligibility for subsidies. During a SEP, individuals have a limited window of time to enroll in or make changes to their ACA insurance plans to ensure they have adequate coverage based on their changed circumstances. It’s important to note that documentation or proof may be required to verify eligibility for a SEP.',
            text3: ''
        },
        {
            title: 'ACA is Beneficial To Your Clients & Customers',
            text1: 'ACA insurance plans cover essential health benefits, including preventive services, prescription drugs, maternity care, mental health services, and emergency care. These plans are designed to ensure individuals have access to comprehensive healthcare coverage.',
            text2: 'ACA insurance plans cannot deny coverage or charge higher premiums based on pre-existing conditions. This means that individuals with pre-existing health conditions cannot be denied coverage or charged more due to their medical history.',
            text3: 'Plus, ACA insurance plans offer subsidies and tax credits to make coverage more affordable for eligible individuals and families. These subsidies are based on income and help lower monthly premiums and out-of-pocket costs for those who qualify.'
        },
        {
            title: 'Expand Your Customer Base & Expand Your Commissions',
            text1: 'Expanded customer base: By offering ACA health plans, agents and brokers can tap into a large and diverse market of individuals and families seeking comprehensive health insurance coverage. This expands your potential customer base and provides opportunities for new client acquisitions.',
            text2: 'Commissions and compensation: Selling ACA health plans can be financially rewarding for agents and brokers. You can earn commissions or other forms of compensation for enrolling individuals in these plans, providing a steady income stream. Overall, offering ACA health plans can broaden an agent or broker’s market reach, provide financial incentives, strengthen client relationships, showcase compliance expertise, and help clients access subsidies, making it a beneficial option to consider.',
            text3: ''
        },
        {
            title: 'How can Essential Help with Medicare?',
            text1: 'Essential Insurance Services stands out from the competition by offering our agents a truly unique opportunities to boost your sales and grow your ACA insurance business. From offering agents the ability to customize their marketing to match the individual needs of their clients, to providing access to a wide range of innovative industry tools such as our Digital ACA Quoting & Enrollment Platform to help close more sales.',
            text2: 'Furthermore, with unbeatable customer service and unparalleled attention to detail, we allow agents to provide their clients with the best possible coverage and ensure that their needs are met with the utmost professionalism.  With Essential Insurance Services, agents can look forward to a rewarding and successful career as a professional insurance agent.',
            text3: ''
        }
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
                                    <p>{item.text1}</p>
                                    {item.text2 !== '' &&
                                        <p>{item.text2}</p>
                                    }
                                    {item.text3 !== '' &&
                                        <p>{item.text3}</p>
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
