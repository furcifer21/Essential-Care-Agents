"use client";
import React, {useEffect} from "react";
import MainLayout from "../../../../components/MainLayout";
import TableBlock from "../../../../components/pages/cabinet-page/TableBlock";
import {redirect, useRouter} from "next/navigation";
import {getCookie} from "../../../../components/helper";
import axios from "axios";
import {CLIENT_API_URL} from "../../../../components/constants";
import useAuthStore from "../../../../components/storage";
import {toast} from "sonner";

// export const metadata = {
//     title: 'My Contracting',
//     description: '',
// };

//todo: check if user is authenticated - redirect to login page if not authenticated
//todo: check if user has access to this page - redirect to login page if not
//todo: Load all carriers
//todo: load all existing contracts for the user
//todo: prepare data for the table


const data = [
    {
        id: 1,
        carrier: 'Carrier A',
        status: 'Available',
        statusDate: '',
        writingNo: '',
        appointedStates: '',
        markets: 'ACA',
        RequestContract: ''
    },
    {
        id: 2,
        carrier: 'Carrier B',
        status: 'Inactive',
        statusDate: '2023-11-15',
        writingNo: 'WR5678',
        appointedStates: 'TX, FL',
        markets: 'Life, Property',
        RequestContract: ''
    },
    {
        id: 3,
        carrier: 'Carrier A',
        status: 'Active',
        statusDate: '2024-04-01',
        writingNo: 'WR1234',
        appointedStates: 'NY, CA',
        markets: 'Health, Auto',
        RequestContract: ''
    },
    {
        id: 4,
        carrier: 'Carrier A',
        status: 'Active',
        statusDate: '2024-04-01',
        writingNo: 'WR1234',
        appointedStates: 'NY, CA',
        markets: 'Health, Auto',
        RequestContract: ''
    },
    {
        id: 5,
        carrier: 'Carrier A',
        status: 'Active',
        statusDate: '2024-04-01',
        writingNo: 'WR1234',
        appointedStates: 'AZ;CA;DE;FL;GA;IL;IN;KS;MD;MO;NC;NJ;NV;OH;TX;UT;VA',
        markets: 'Health, Auto',
        RequestContract: ''
    },
    {
        id: 6,
        carrier: 'Carrier A',
        status: 'Active',
        statusDate: '2024-04-01',
        writingNo: 'WR1234',
        appointedStates: 'NY, CA',
        markets: 'Health, Auto',
        RequestContract: ''
    },
    {
        id: 7,
        carrier: 'Carrier A',
        status: 'Active',
        statusDate: '2024-04-01',
        writingNo: 'WR1234',
        appointedStates: 'NY, CA',
        markets: 'Health, Auto',
        RequestContract: ''
    },
    {
        id: 8,
        carrier: 'Carrier A',
        status: 'Active',
        statusDate: '2024-04-01',
        writingNo: 'WR1234',
        appointedStates: 'NY, CA',
        markets: 'Health, Auto',
        RequestContract: ''
    },
    {
        id: 9,
        carrier: 'Carrier A',
        status: 'Active',
        statusDate: '2024-04-01',
        writingNo: 'WR1234',
        appointedStates: 'NY, CA',
        markets: 'Health, Auto',
        RequestContract: ''
    },
    {
        id: 10,
        carrier: 'Carrier A',
        status: 'Active',
        statusDate: '2024-04-01',
        writingNo: 'WR1234',
        appointedStates: 'NY, CA',
        markets: 'Health, Auto',
        RequestContract: ''
    },
    {
        id: 11,
        carrier: 'Carrier A',
        status: 'Active',
        statusDate: '2024-04-01',
        writingNo: 'WR1234',
        appointedStates: 'NY, CA',
        markets: 'Health, Auto',
        RequestContract: ''
    },
    {
        id: 12,
        carrier: 'Carrier A',
        status: 'Active',
        statusDate: '2024-04-01',
        writingNo: 'WR1234',
        appointedStates: 'NY, CA',
        markets: 'Health, Auto',
        RequestContract: ''
    },
];

export default function MyContractingPage() {
    const { token, user, isHydrated } = useAuthStore();
    const router = useRouter();
    const [tableData, setTableData] = React.useState(null);
    const [carriersList, setCarriersList] = React.useState(null); // {"carrier.id" : { carrier.carrier_name, states: [state.id,...] } }

    useEffect(() => {
        if (!isHydrated) {
            // Ждем, пока Zustand восстановит состояние
            return;
        }
        if (!token) {
            router.push('/login');
            return;
        }

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
                            RequestContract: ''
                        };
                        contractsData.push(row);
                    }
                }
                console.log('carrierUsedStates',carrierUsedStates);

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
                            appointedStates: allowedStates.join(', ') || '',
                            markets: 'ACA',
                            RequestContract: ''
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

        localFetchData();
    }, [token, router, isHydrated]);

    return (
        <MainLayout isAuth>
            <section className="section-margin pt-3">
                <div className="container">
                    <h1 className="mb-3">My Contracting Report</h1>
                    <TableBlock tableData={tableData}/>
                </div>
            </section>
        </MainLayout>
    );
}
