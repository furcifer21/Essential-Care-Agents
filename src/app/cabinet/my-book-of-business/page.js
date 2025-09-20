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
import BoBTableBlock from "../../../../components/pages/cabinet-page/BoBTableBlock";


export default function MyBookOfBusinessPage() {
    const {token, user, isHydrated} = useAuthStore();
    const router = useRouter();
    const [tableData, setTableData] = useState(null);

    const localFetchData = async () => {
        const policiesData=[];
        try {
            // Список уже существующих контрактов и запросов для пользователя
            const response = await axios.get(CLIENT_API_URL+'/api/policies', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('localFetchData', response.data?.data);
            if(response.data?.data && Array.isArray(response.data.data)) {
                for(const policy of response.data.data) {
                    const row ={
                        id: policy.id,
                        carrier: policy.carrier.carrier_name || '',
                        carrierId: policy.carrier_id || '',
                        agent: policy.agent.full_name || '',
                        agentId: policy.agent_id || '',
                        marketId: policy.market_id || '',
                        state: policy.state.state_name || '',
                        stateId: policy.state_id || '',
                        consumerName: policy.consumer_name || '',
                        planName: policy.plan_name || '',
                        policyType: policy.policy_type || '',
                        signedDate: policy.signed_date || '',
                        effectiveDate: policy.effective_date || '',
                        terminationDate: policy.termination_date || '',
                        terminationReason: policy.termination_reason || '',
                    };
                    policiesData.push(row);
                }
            }
            console.log('localFetchData', policiesData);

            setTableData(policiesData);
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
                    <h1 className="mb-3">Book of business</h1>
                    <BoBTableBlock tableData={tableData} fetchData={localFetchData}/>
                </div>
            </section>
        </MainLayout>
    );
}
