"use client";
import React, {useEffect} from "react";
import MainLayout from "../../../../components/MainLayout";
import Link from "next/link";
import axios from "axios";
import useAuthStore from "../../../../components/storage";
import {useRouter} from "next/navigation";
import {CLIENT_API_URL} from "../../../../components/constants";
import {toast} from "sonner";

export default function MyTrainingPage() {
    const cards = [
        {
            name: 'Important Documents!',
            link: '?',
            text: 'Review Compliance, Procedures and Policies.',
            color: '#192954',
            icon: ''
        },
        {
            name: 'ACA - Training',
            link: '/aca-training',
            text: 'Your All-In-One HUB for Idustry Training',
            icon: '',
            color: '#E8623C',
        },
        {
            name: 'My Contracts',
            link: '/cabinet/my-contracting',
            text: 'View Active Contracting Report',
            color: '#192954',
            icon: 'list-icon'
        },
        {
            name: 'My Payments',
            link: '/cabinet/my-payment',
            text: 'View All Commission Statements',
            color: '#E8623C',
            icon: 'money-icon'
        },
        /*{
            name: 'My Agreements',
            link: '?',
            text: 'View Signed Agreements & Documents',
            color: '#E8623C',
            icon: 'pen-icon'
        },
        {
            name: 'My Events',
            link: '?',
            text: 'RSVP Local Events & Webinars',
            color: '#192954',
            icon: 'calendar-icon'
        }*/
    ];
    const bottomCards = [
        {
            name: 'Returning Agent FFM Training Portal',
            link: 'https://portal.cms.gov/portal/',
            text: 'Website link',
            color: '#E8623C',
        },
        {
            name: 'New Agent FFM Traning Portal',
            link: 'https://portal.cms.gov/portal/newuserregistration',
            text: 'Website link',
            color: '#192954',
        },
        {
            name: 'Create A HealthSherpa Account',
            link: '/healthsherpa',
            text: 'Website link',
            color: '#192954',
            cols: 12
        },
        {
            name: 'New Agent FFM Training Guide',
            link: 'https://drive.google.com/file/d/13yIgztzZNM4fLpxIhiVvR5jPOFTjFo2y/edit',
            text: 'PDF Download',
            color: '#192954',
        },
        {
            name: 'Returning Agent FFM Training Guide',
            link: 'https://drive.google.com/file/d/1pyXNMakoOqg26KQ5y__vQWIHwPSq3yH3/edit',
            text: 'PDF Download',
            color: '#E8623C',
        },
        {
            name: 'FFM Registration Tracker',
            link: 'https://data.healthcare.gov/ab-registration-tracker',
            text: 'Website link',
            color: '#E8623C',
            cols: 12
        },
        {
            name: 'ACA Commission Schedules',
            link: '/aca-commissions',
            text: 'Website link',
            color: '#192954',
            cols: 12
        },
        {
            name: 'Federal Poverty Level',
            link: 'https://aspe.hhs.gov/topics/poverty-economic-mobility/poverty-guidelines',
            text: 'Website link',
            color: '#E8623C',
            cols: 12
        },
    ]
    const { token, user, isHydrated } = useAuthStore();
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
            <section className="outer-section-margin">
                { isHydrated && user.id &&
                  <h2 className={'text-center pb-2'}>Greetings, {user?.first_name} {user?.last_name}</h2>
                }
                <div className="container">
                    <div className="row ">
                        {bottomCards.map((bottomCard, j) => {
                            return (
                                <div key={`bottom-car-${j}`} className={`col-md-${bottomCard.cols || 6} mb-4`}>
                                    <div className="portal-card extra-small text-center position-relative p-0">
                                        <Link href={bottomCard.link} className="fake-link-block" target="_blank"></Link>
                                        <div className="p-3" style={{backgroundColor: bottomCard.color}}>{bottomCard.name}</div>
                                        <div className="p-3" style={{backgroundColor: bottomCard.color}}>{bottomCard.text}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
