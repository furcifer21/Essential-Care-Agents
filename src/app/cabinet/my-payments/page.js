"use client";

import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import MainLayout from "../../../../components/MainLayout";
import { useAuthStore } from "../../../../components/storage";
import Link from "next/link";


export default function MyPaymentsPage() {
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
            <section className="outer-section-margin">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row mb-4">
                                <div className="col-md-3 mb-4 mb-md-0">
                                    <div className="mydata-card bg-transparent d-flex flex-column align-items-start justify-content-start">
                                        <div className={"mydata-card__title d-flex w-100 align-items-center justify-content-between"}>
                                            W-9 Form:
                                            {user?.pdf_w9_path && <span className={'text-orange'}>Filled</span> }
                                        </div>
                                        <div className={"mydata-card__text d-flex align-items-center justify-content-between"}>
                                            <Link
                                              href={'https://na3.documents.adobe.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhDgaYtEMcec7O-DMDq0WYBxNlzSVpUAS9kS3Q2Zh8TJPOX4xjzaz9KrQaBeNTDXWqM*&hosted=false'}
                                              target={'_blank'}
                                            >{user?.pdf_w9_path
                                              ? 'Update and Sign'
                                              : 'Fulfill and Sign'
                                            }
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 mb-4 mb-md-0">
                                    <div className="mydata-card bg-transparent d-flex flex-column align-items-start justify-content-start">
                                        <div className={"mydata-card__title d-flex w-100 align-items-center justify-content-between"}>
                                            Direct deposit Form:
                                            {user?.pdf_direct_deposit_path && <span className={'text-orange'}>Filled</span> }
                                        </div>
                                        <div className={"mydata-card__text"}>
                                            <Link
                                              href={'https://na3.documents.adobe.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhAs-3pCc-jXJvtDIZw-lClbItdzeFEUpIyTHV5gar3gJhh45jaPB0FcvDGMfiQMg5Q*&hosted=false'}
                                              target={'_blank'}
                                            >{user?.pdf_direct_deposit_path
                                              ? 'Update and Sign'
                                              : 'Fulfill and Sign'
                                            }
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
