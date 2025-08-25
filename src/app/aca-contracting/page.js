import React from "react";
import ContractingForm from "../../../components/pages/contracting-page/ContractingForm";
import InsuranceSection from "../../../components/pages/contracting-page/InsuranceSection";
import MainLayout from "../../../components/MainLayout";
import axios from "axios";
import {API_URL} from "../../../components/constants";

export const dynamic = 'force-dynamic'; // Динамический рендеринг


export const metadata = {
    title: 'Aca Contracting',
    description: '',
};

export default async function AcaContractingPage() {
    const insuranceData = [];
    const usaStates = [];
    try {
        const response = await axios.get(API_URL + '/api/carriers');
        if (response?.data?.data && Array.isArray(response.data.data)) {
            for(const carrier of response.data.data) {
                if(carrier.logo_path) {
                    insuranceData.push({
                        id: carrier.id,
                        logo: `/storage/` + carrier.logo_path,
                        name: carrier.carrier_name || 'Unknown Carrier',
                        products_info: carrier.products_info || '',
                        states_info: carrier.states_info || ''
                    })
                }
            }
        }
    }
    catch (error) {
        console.error("Error fetching carriers:", error);
    }

    try {
        const response = await axios.get(API_URL + '/api/states');
        if(response?.data?.data) {
            for(const [key, value] of Object.entries(response?.data?.data)) {
                usaStates.push({'id': key, 'state_name': value});
            }
        }
    }
    catch (error) {
        console.error("Error fetching USA States:", error);
    }

    return (
        <MainLayout>
            <div className="contract-page-wrap">
                <ContractingForm insuranceData={insuranceData} usaStates={usaStates} />
                {insuranceData.length > 0 &&
                    <InsuranceSection insuranceData={insuranceData}/>
                }
            </div>
        </MainLayout>
    );
}

