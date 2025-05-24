import React from "react";
import Link from "next/link";
import MainLayout from "../../../components/MainLayout";

export const metadata = {
    title: 'Aca Certification',
    description: '',
};

export default function AcaCertificationPage() {
    const linksData = [
        {
            title: 'Complete 2025 FFM Certification',
            link: 'https://portal.cms.gov/portal/',
            icon: 'link-icon'
        },
        {
            title: 'Create My HealthSherpa Account',
            link: 'https://www.healthsherpa.com/agents/new_user?join_code=b4fd&_agent_id=agility',
            icon: 'laptop-icon'
        },
        {
            title: 'HealthSherpa Platform Overview',
            link: 'https://www.youtube.com/watch?v=78qfeqxJV5k',
            icon: 'youtube-icon'
        },
        {
            title: '2025 FFM Certification Guide',
            link: 'https://drive.google.com/file/d/13yIgztzZNM4fLpxIhiVvR5jPOFTjFo2y/edit',
            icon: 'link-icon'
        },
        {
            title: 'Agent & Broker Video Learning Center',
            link: 'https://www.cms.gov/marketplace/agents-brokers/video-learning-center',
            icon: 'youtube-icon'
        },
        {
            title: 'FFM Registration Status',
            link: 'https://data.healthcare.gov/ab-registration-tracker',
            icon: 'link-icon'
        }
    ]

    return (
        <MainLayout>
            <section className="certification-section-main section-margin">
                <div className="container d-flex align-items-center justify-content-center">
                    <div className="text-center">
                        <h1 className="mb-4 pb-3">
                            <b>ACA Marketplace</b><br/>Certification & Training
                        </h1>
                        <h2>Be prepared to sell ACA health plans during plan year 2025.</h2>
                    </div>
                </div>
            </section>
            <div className="certification-other-resources">
                <div className="container d-flex flex-column flex-xl-row align-items-center justify-content-center">
                    <h4 className="mb-3 mb-xl-0 me-xl-4 text-center text-xl-start">Other Resources:</h4>
                    <Link href={`/aca-contracting`} className="btn-basic">ACA Contracting</Link>
                </div>
            </div>
            <section className="certification-links-section section-margin">
                <div className="container">
                    <div className="row">
                        {linksData.map((item, i) => {
                            return (
                                <div key={`certification-${i}`} className="col-md-6 col-xl-4 position-relative text-center">
                                    <div className="certification-links-section__card">
                                        <a href={item.link} target="_blank" className="fake-link-block"></a>
                                        <svg className="svg-icon mb-5">
                                            <use xlinkHref={`/images/sprite.svg#${item.icon}`}></use>
                                        </svg>
                                        <h4>{item.title}</h4>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
            <section className="certification-agents-section section-margin">
                <div className="container">
                    <div className="certification-agents-card-wrap d-xl-flex">
                        <div className="certification-agents-card">
                            <h4><span>2025</span> New Agents & Brokers</h4>
                            <div className="d-flex flex-column justify-content-between p-3">
                                <div>
                                    <p>
                                        Agents and brokers who are new to the Marketplace this year, or who
                                        did not complete plan year 2024 registration and training, are required to
                                        take the full Individual Marketplace training for plan year 2025.
                                        Check out the guide for new agents and brokers to help you through the
                                        registration and training steps.
                                    </p>
                                    <p className="fw-semibold">
                                        When registering your account, select <span>'MLMS: Marketplace Learning Management System'</span> in the drop-down menu.
                                    </p>
                                </div>
                                <div className="certification-agents-card__btns d-flex">
                                    <Link href="https://drive.google.com/file/d/13yIgztzZNM4fLpxIhiVvR5jPOFTjFo2y/edit" target={`_blank`} className="btn-basic">
                                        Agent Guide
                                    </Link>
                                    <Link href="https://portal.cms.gov/portal/newuserregistration" target={`_blank`} className="btn-secondary">
                                        Training Link
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="certification-agents-card">
                            <h4><span>2025</span> Returning Agents & Brokers</h4>
                            <div className="d-flex flex-column justify-content-between p-3">
                                <div>
                                    <p>
                                        Agents and brokers who completed plan year 2024 Individual Marketplace
                                        registration and training will be eligible to take a new half-hour
                                        training for plan year 2025, as well as optional review modules.Returning
                                        agents and brokers can take Individual Marketplace training either through
                                        the Marketplace Learning Management System (MLMS) or the CMS-approved vendor
                                        regardless of how they completed the plan year 2024 training.
                                    </p>
                                    <p>
                                        Check out the guide below for returning agents and brokers to help you through the
                                        registration and training steps and process.
                                    </p>
                                </div>
                                <div className="certification-agents-card__btns d-flex">
                                    <Link href="https://drive.google.com/file/d/1pyXNMakoOqg26KQ5y__vQWIHwPSq3yH3/edit" target={`_blank`} className="btn-basic">
                                        Agent Guide
                                    </Link>
                                    <Link href="https://portal.cms.gov/portal/" target={`_blank`} className="btn-secondary">
                                        Training Link
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="certification-bottom-section section-margin">
                <div className="container">
                    <div className="certification-bottom-card d-flex flex-column-reverse flex-xl-row align-items-center">
                        <div className="certification-bottom-card__btn d-flex align-items-center justify-content-center flex-shrink-0">
                            <Link href={`https://blog.enrollinsurance.com/2023/06/important-update-health-and-human-services-introduces-new-consent-requirement-for-aca-enrollments/?_gl=1*13rt5mm*_gcl_au*ODcwOTk0Mjg3LjE3NDc5ODE4MDk.*_ga*MTA5ODc1Nzg0OS4xNzQ3OTgxODA5*_ga_68J7MNP2PJ*czE3NDgwNjk2MzMkbzIkZzEkdDE3NDgwOTEzMTUkajYwJGwwJGgxMDM5MjI0MTc2JGRFNVQtR0tBNXZfQzIwNS1Ua2JCdUl0ejRVTlFZcTNFa3dR`}
                                  className="btn-basic"
                            >
                                Learn More
                            </Link>
                        </div>
                        <div className="p-3">
                            <h2 className="mb-3 pb-3">
                                <Link href={`/aca-contracting`}>ACA Final Rule</Link>
                            </h2>
                            <p>
                                Under the new ACA rule, registered agents and brokers will be required to obtain
                                documented consent from consumers before accessing or updating their Marketplace
                                information.While CMS currently does not mandate a specific method for documenting
                                consent, they’ve shared a model consent form that can serve as a helpful starting
                                point for our agents.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
