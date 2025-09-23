"use client";

import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import MainLayout from "../../../../components/MainLayout";
import { useAuthStore } from "../../../../components/storage";
import Link from "next/link";
import {CLIENT_API_URL, FORM_DIRECT_DEPOSIT_LINK, FORM_W9_LINK} from "../../../../components/constants";
import TableBlock from "../../../../components/pages/cabinet-page/TableBlock";
import axios from "axios";
import {toast} from "sonner";
import PaymentsTableBlock from "../../../../components/pages/cabinet-page/PaymentsTableBlock";


export default function MyPaymentsPage() {
    const {token, user, isHydrated} = useAuthStore();
    const router = useRouter();
    const [tableData, setTableData] = useState(null);
    const [summaryData, setSummaryData] = useState(null);

    const localFetchData = async () => {
        const paymentsData=[];
        try {
            // Список уже существующих контрактов и запросов для пользователя
            const response = await axios.get(CLIENT_API_URL+'/api/payments', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if(response.data?.data && Array.isArray(response.data.data)) {
                for(const payment of response.data.data) {
                    const row ={
                        id: payment.id,
                        carrier: payment.carrier.carrier_name || '',
                        carrierId: payment.carrier_id || '',
                        agent: payment.agent.full_name || '',
                        agentId: payment.agent_id || '',
                        marketId: payment.market_id || '',
                        state: payment.state.state_name || '',
                        stateId: payment.state_id || '',
                        consumerName: payment.consumer_name || '',
                        planName: payment.product_name || '',
                        statementDate: payment.statement_date || '',
                        effectiveDate: payment.effective_date || '',
                        paymentPeriod: payment.payment_period || '',
                        agentWritingNo: payment.agent_writing_no || '',
                        commissionAmount: payment.commission_amount || '',
                        comments: payment.comments || '',
                    };
                    paymentsData.push(row);
                }
                // console.log('paymentsData.data',paymentsData.data);
            }
            setTableData(paymentsData);
            if(response.data?.summary && Array.isArray(response.data.summary)) {
                setSummaryData(response.data.summary);
            }
            else {
                setSummaryData([]);
            }
            // console.log('paymentsData.summary', paymentsData.summary);

        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Error fetching data:', JSON.stringify(error.response) );
            if (error.response?.status === 401) {
                // Если токен недействителен, очищаем состояние и перенаправляем
                useAuthStore.getState().clearAuth();
                router.push('/login');
            }
        }
    };


    useEffect(() => {
        if (!isHydrated) {
            // Ждем, пока Zustand восстановит состояние
            return;
        }
        if (!token) {
            router.push('/login');
        }
        localFetchData().then();
    }, [token, router, isHydrated]);

    return (
        <MainLayout isAuth>
            <section className="outer-section-margin">
                { isHydrated && user?.id &&
                  <h2 className={'text-center pb-2'}>Greetings, {user?.first_name} {user?.last_name}</h2>
                }
                <div className="container">
                    <h1 className="mb-3">My payments</h1>
                    <PaymentsTableBlock tableData={tableData} summaryData={summaryData} fetchData={localFetchData}/>
                </div>
            </section>
        </MainLayout>
    );
}
