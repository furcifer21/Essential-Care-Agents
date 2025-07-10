"use client";

import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import MainLayout from "../../../../components/MainLayout";
import Form404 from "../../../../components/pages/cabinet-page/Form404";
import { useAuthStore } from "../../../../components/storage";
import Link from "next/link";

export default function MyHomePage() {
    const {token, user, isHydrated} = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!isHydrated) {
            // Ждем, пока Zustand восстановит состояние
            return;
        }
        if (!token) {
            router.push('/login');
        }

    }, [token, router, isHydrated]);

    return (
        <MainLayout isAuth>
            {/*<section className="outer-section-margin">*/}
            {/*    { isHydrated && user?.id &&*/}
            {/*      <h2 className={'text-center pb-2'}>Greetings, {user?.first_name} {user?.last_name}</h2>*/}
            {/*    }*/}
            {/*    <div className="container">*/}
            {/*        <div className="row ">*/}
            {/*            {bottomCards.map((bottomCard, j) => {*/}
            {/*                return (*/}
            {/*                  <div key={`bottom-car-${j}`} className={`col-md-${bottomCard.cols || 6} mb-4`}>*/}
            {/*                      <div className="portal-card extra-small text-center position-relative p-0">*/}
            {/*                          <Link href={bottomCard.link} className="fake-link-block" target="_blank"></Link>*/}
            {/*                          <div className="p-3" style={{backgroundColor: bottomCard.color}}>{bottomCard.name}</div>*/}
            {/*                          <div className="p-3" style={{backgroundColor: bottomCard.color}}>{bottomCard.text}</div>*/}
            {/*                      </div>*/}
            {/*                  </div>*/}
            {/*                )*/}
            {/*            })}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}
            <section className="contacts-links-section section-margin">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-xl-4 position-relative text-center pointer">
                            <div className="contacts-links-section__card">
                                <a href="tel:3479713399" target="_blank" className="fake-link-block"></a>
                                <svg className="svg-icon mb-2">
                                    <use xlinkHref={`/images/sprite.svg#phone-icon`}></use>
                                </svg>
                                <h4>Call Us</h4>
                                <span>(347) 971-3399</span>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-4 position-relative text-center pointer">
                            <div className="contacts-links-section__card">
                                <a href="mailto:support@essentialcare.info" target="_blank" className="fake-link-block"></a>
                                <svg className="svg-icon mb-2">
                                    <use xlinkHref={`/images/sprite.svg#email-icon`}></use>
                                </svg>
                                <h4>Email Us</h4>
                                <span>support@essentialcare.info</span>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-4 position-relative text-center pointer">
                            <div className="contacts-links-section__card">
                                {/*<a href="#" target="_blank" className="fake-link-block"></a>*/}
                                <svg className="svg-icon mb-2">
                                    <use xlinkHref={`/images/sprite.svg#link-icon`}></use>
                                </svg>
                                <h4>Our Location</h4>
                                <span>2801 Emmons Ave Brooklyn, NY 11235</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-xl-6 position-relative text-center pointer">
                            <div className="contacts-links-section__card align-content-center">
                                <a href="https://www.cms.gov/medicare/medicaid-coordination/center-program-integrity/reporting-fraud" target="_blank" className="fake-link-block"></a>
                                <h4 style={{fontSize:'24px', fontWeight:'800'}}> Medicare Fraud, Waste & Abuse OIG</h4>
                                <span style={{fontSize:'22px', fontWeight:'400'}}>Hotline: (800) 447-8477 | CMS.gov</span>
                            </div>
                        </div>
                        <div className="col-md-16 col-xl-6 position-relative text-center pointer">
                            <div className="contacts-links-section__card align-content-center">
                                <a href="mailto:compliance@essentialcare.info" target="_blank" className="fake-link-block"></a>
                                <h4 style={{fontSize:'24px', fontWeight:'800'}}>Essential FWA Reporting</h4>
                                <span style={{fontSize:'22px', fontWeight:'400'}}>Hotline: (347) 971-3699 | compliance@essentialcare.info</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
