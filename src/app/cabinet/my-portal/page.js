"use client";
import React, {useEffect, useState} from "react";
import MainLayout from "../../../../components/MainLayout";
import Link from "next/link";
import axios from "axios";
import { useAuthStore, useCacheStorage } from "../../../../components/storage";
import {useRouter} from "next/navigation";
import {CLIENT_API_URL} from "../../../../components/constants";
import {toast} from "sonner";
import AgreementsModal from "../../../../components/pages/cabinet-page/AgreementsModal";
import { formatDate} from "../../../../components/helper";
import ImportantDocumentsModal from "../../../../components/pages/cabinet-page/ImportantDocumentsModal";

export default function MyPortalPage() {
    const cards = [
        {
            name: 'Important Documents!',
            link: '#',
            click: (evt) => handleImportantDocumentsClick(evt),
            // link: 'https://drive.google.com/drive/folders/1Ayqh2fCx_s1eaCaD0TvSHQhPZwFdFMAz?usp=sharing',
            text: 'Review Compliance, Procedures and Policies.',
            color: '#192954',
            icon: '',
            target: '_blank',
        },
        {
            name: 'ACA - Training',
            link: '/cabinet/my-training',
            text: 'Your All-In-One HUB for ACA Training',
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
            link: '/cabinet/my-payments',
            text: 'View All Commission Statements',
            color: '#E8623C',
            icon: 'money-icon'
        },
        {
            name: 'My Agreements',
            link: '#',
            click: (evt) => handleMyAgreementsClick(evt),
            text: 'View Signed Agreements & Documents',
            color: '#192954',
            icon: 'pen-icon'
        },
        /*{
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
            link: '/healthsherpa',
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
            link: '/aca-commissions',
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isImportantModalOpen, setIsImportantModalOpen] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [importantTableData, setImportantTableData] = useState([]);

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

        const td = [];
        td.push({
            'id': 'user-producer-agreement',
            'agreementType': 'Producer Agreement',
            'agreementNo': user?.producerAgreementNo || '',
            'agreementDate': user?.producerAgreementDate && formatDate(user?.producerAgreementDate) || '',
            'npn': user?.npn,
        })
        if(user?.agent_type === 2) {
            td.push({
                'id': 'user-fee-agreement',
              'agreementType': 'Administration Fee Agreement',
              'agreementNo': user?.feeAgreementNo || '',
              'agreementDate': user?.feeAgreementDate && formatDate(user?.feeAgreementDate) || '',
              'npn': user?.npn,
            })
        }
        setTableData(td);

        const itd=[];
        itd.push({
            'id' : 1,
            'documentName': 'Employee Code Of Conduct.pdf',
        });
        itd.push({
            'id' : 2,
            'documentName': 'ESSENTIAL CARE AGENT & EMPLOYEE EXCLUSION SCREENING.pdf',
        });
        itd.push({
            'id' : 3,
            'documentName': 'FRAUD, WASTE & ABUSE.pdf',
        });
        itd.push({
            'id' : 4,
            'documentName': 'General Compliance Training.pdf',
        });
        itd.push({
            'id' : 5,
            'documentName': 'PRIVACY POLICY AND PROCEDURE.pdf',
        });
        setImportantTableData(itd);


        const fetchData = async () => {
            try {
                const response = await axios.get(CLIENT_API_URL+'/api/contracts', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // console.log('Success Fetch Data:', response.data);
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

    const handleMyAgreementsClick = (evt) => {
        evt.preventDefault();
        setIsModalOpen(true);
    }
    const handleImportantDocumentsClick = (evt) => {
        evt.preventDefault();
        setIsImportantModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsImportantModalOpen(false);
    };

    return (
        <MainLayout isAuth>
            <section className="outer-section-margin">
                { isHydrated && user?.id &&
                    <h2 className={'text-center pb-2'}>Greetings, {user?.first_name} {user?.last_name}</h2>
                }
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
                                    <div>{user?.address}</div>
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
                                            <use xlinkHref="/images/sprite.svg#email-icon"></use>
                                        </svg>
                                        {user?.email}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="d-flex align-items-center mb-2">
                                        <svg className="svg-icon flex-shrink-0 me-2">
                                            <use xlinkHref="/images/sprite.svg#pdf1-icon"></use>
                                        </svg>
                                        W-9 form: {user?.pdf_w9_path ? 'Completed' : 'Need to fulfill'}
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <svg className="svg-icon flex-shrink-0 me-2">
                                            <use xlinkHref="/images/sprite.svg#pdf1-icon"></use>
                                        </svg>
                                        Direct deposit form: {user?.pdf_direct_deposit_path ? 'Completed' : 'Need to fulfill'}
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
                                                { card.click ?
                                                  <Link href={card.link} className="fake-link-block" onClick={card.click} target={card.target || ''}></Link>
                                                  :
                                                  <Link href={card.link} className="fake-link-block" target={card.target || ''}></Link>
                                                }
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
                <AgreementsModal
                  tableData={tableData}
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                />
                <ImportantDocumentsModal
                  tableData={importantTableData}
                  isOpen={isImportantModalOpen}
                  onClose={handleCloseModal}
                />
            </section>
        </MainLayout>
    );
}
