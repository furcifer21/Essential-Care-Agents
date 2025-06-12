"use client";
import React, {useEffect} from "react";
import MainLayout from "../../../../components/MainLayout";
import Link from "next/link";
import axios from "axios";
import useAuthStore from "../../../../components/storage";
import {useRouter} from "next/navigation";
import {CLIENT_API_URL} from "../../../../components/constants";
import {toast} from "sonner";

export default function MyPortalPage() {
    const cards = [
        /*{
            name: 'Training Central',
            link: '?',
            text: 'Your All-In-One HUB for Idustry Training',
            icon: '',
            color: '#E8623C',
        },*/
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
        {
            name: 'Important Documents!',
            link: '?',
            text: 'Review Compliance, Procedures and Policies.',
            color: '#192954',
            icon: ''
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
            name: 'HealthSherpa',
            link: '?',
            text: 'ACA Enhanced Direct Enrollment',
            color: '#E8623C',
        },
        /*{
            name: 'ConnectureDRX',
            link: '?',
            text: 'Digital Medicare Quoting & Enrollment',
            color: '#192954',
        },*/
        {
            name: 'ACA Commissions',
            link: '?',
            text: 'Commission Schedules & Bonuses',
            color: '#192954',
        },
        /*{
            name: 'Medicare Commissions',
            link: '?',
            text: 'Commission Schedules & Bonuses',
            color: '#E8623C',
        },*/
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
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(CLIENT_API_URL+'/api/contracts', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Success Fetch Data:', response.data);
            } catch (error) {
                toast.error('Error fetching data:', error);
                if (error.response?.status === 401) {
                    // Если токен недействителен, очищаем состояние и перенаправляем
                    useAuthStore.getState().clearAuth();
                    router.push('/login');
                }
            }
        };

        fetchData();
    }, [token, router, isHydrated]);

    return (
        <MainLayout isAuth>
            <section className="section-margin">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row mb-4">
                                <div className="col-md-6 mb-4 mb-md-0">
                                    <div className="portal-card small bg-transparent d-flex align-items-center justify-content-center">
                                        <h1 className="mb-3">MyPortal: Overview</h1>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="portal-card small bg-transparent d-flex align-items-center justify-content-center">
                                        <Link href={`/cabinet/my-data`} className="btn-basic">Update My Profile</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="portal-card big mb-4">
                                <h3 className="mb-2">{user?.first_name} {user?.last_name}</h3>
                                <div className="mb-4">
                                    <div className="fw-semibold mb-2">National Producer Number (NPN):</div>
                                    <div>{user?.npn}</div>
                                </div>
                                <div className="mb-4">
                                    <div className="fw-semibold mb-2">Address:</div>
                                    <div className="mb-2"></div>
                                    <div></div>
                                </div>
                                <div className="mb-4">
                                    <div className="d-flex align-items-center mb-2">
                                        <svg className="svg-icon flex-shrink-0 me-2">
                                            <use xlinkHref="/images/sprite.svg#phone-icon"></use>
                                        </svg>
                                        {user?.phone}
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <svg className="svg-icon flex-shrink-0 me-2">
                                            <use xlinkHref="/images/sprite.svg#phone-icon"></use>
                                        </svg>
                                        {user?.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                {cards.map((card, i) => {
                                    return (
                                        <div key={`card-${i}`} className="col-6 mb-4">
                                            <div className="portal-card small d-flex flex-column justify-content-between text-center position-relative p-0">
                                                <Link href={card.link} className="fake-link-block"></Link>
                                                <div className="portal-card__title p-3">
                                                    {card.icon !== '' &&
                                                        <div className="d-inline-flex align-items-center justify-content-center mb-3" style={{backgroundColor: card.color}}>
                                                            <svg className="svg-icon flex-shrink-0">
                                                                <use xlinkHref={`/images/sprite.svg#${card.icon}`}></use>
                                                            </svg>
                                                        </div>
                                                    }
                                                    <h4 className="mb-3">{card.name}</h4>
                                                </div>
                                                <div className="portal-card__text p-3" style={{backgroundColor: card.color}}>{card.text}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="row ">
                        {bottomCards.map((bottomCard, j) => {
                            return (
                                <div key={`bottom-car-${j}`} className="col-md-6 mb-4">
                                    <div className="portal-card extra-small text-center position-relative p-0">
                                        <Link href={bottomCard.link} className="fake-link-block"></Link>
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
