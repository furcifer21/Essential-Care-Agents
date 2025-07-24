"use client";
import React, {useEffect, useState} from "react";
import MainLayout from "../../../../components/MainLayout";
import TableBlock from "../../../../components/pages/cabinet-page/TableBlock";
import {useRouter} from "next/navigation";
import axios from "axios";
import {CLIENT_API_URL} from "../../../../components/constants";
import { useAuthStore } from "../../../../components/storage";
import {toast} from "sonner";
import ProducerAgreementModal from "../../../../components/pages/contracting-page/ProducerAgreementModal";


//todo: check if user is authenticated - redirect to login page if not authenticated
//todo: check if user has access to this page - redirect to login page if not
//todo: Load all carriers
//todo: load all existing contracts for the user
//todo: prepare data for the table


export default function MyContractingPage() {
    const { token, user, isHydrated } = useAuthStore();
    const router = useRouter();
    const [tableData, setTableData] = useState(null);

    const localFetchData = async () => {
        const contractsData=[];
        const carrierUsedStates = {};
        try {
            // Список уже существующих контрактов и запросов для пользователя
            const response = await axios.get(CLIENT_API_URL+'/api/contracts', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if(response.data?.data && Array.isArray(response.data.data)) {
                for(const contract of response.data.data) {
                    if(!carrierUsedStates[contract.carrier.id]) {
                        carrierUsedStates[contract.carrier.id]=new Set();
                    }
                    const appointedStates = contract.states ? contract.states.map(state => state.id) : [];
                    for(const stateId of appointedStates) {
                        carrierUsedStates[contract.carrier.id].add(stateId);
                    }

                    const row ={
                        id: contract.id,
                        carrier: contract.carrier.carrier_name || '',
                        status: contract.status.status_name || '',
                        statusDate: contract.contract_date || '',
                        writingNo: contract.contract_no || '',
                        appointedStates: appointedStates.join(',') || '',
                        markets: contract.market ? contract.market.market_name : '',
                        RequestContract: '',
                        className: `text-status-level-${contract.status?.level || '0'}`
                    };
                    contractsData.push(row);
                }
            }

            // Список всех доступных страховых компаний. Для тех у кого уже есть контракты, уберем из списка "занятые" штаты
            // и добавим в таблицу со свободными штатами только. Для того чтобы можно было запросить контракт на эти штаты.
            const response2 = await axios.get(CLIENT_API_URL+'/api/carriers', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if(response2.data?.data && Array.isArray(response2.data.data)) {
                for(const carrier of response2.data.data) {
                    const allowedStates = carrier.states ? carrier.states.map(state => state.id).filter(stateId => !(carrierUsedStates[carrier.id] && carrierUsedStates[carrier.id].has(stateId))) : [];
                    const row ={
                        id: '0-'+carrier.id,
                        carrier: carrier.carrier_name || '',
                        status: 'Available',
                        statusDate: '',
                        writingNo: '',
                        appointedStates: allowedStates.join(',') || '',
                        markets: 'ACA',
                        RequestContract: '',
                        className: 'text-status-level-4'
                    };
                    contractsData.push(row);
                }
            }
            setTableData(contractsData);
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

    const handleProducerAgreementClick = (evt) => {
        evt.preventDefault();
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    useEffect(() => {
        if (!isHydrated) {
            return;
        }
        if (!token) {
            router.push('/login');
            return;
        }
        localFetchData().then();
    }, [token, router, isHydrated]);

    return (
        <MainLayout isAuth>
            <section className="outer-section-margin pt-3">
                { isHydrated && user?.id &&
                  <h2 className={'text-center pb-2'}>Greetings, {user?.first_name} {user?.last_name}</h2>
                }
                <div className="container">
                    <h1 className="mb-3">My Contracting Report</h1>
                    <TableBlock tableData={tableData} fetchData={localFetchData}/>
                </div>
            </section>
        </MainLayout>
    );
}
