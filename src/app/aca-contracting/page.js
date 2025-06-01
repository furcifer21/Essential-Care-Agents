import React from "react";
import ContractingForm from "../../../components/pages/contracting-page/ContractingForm";
import InsuranceSection from "../../../components/pages/contracting-page/InsuranceSection";
import MainLayout from "../../../components/MainLayout";
import axios from "axios";
import {API_URL} from "../../../components/constants";

export const metadata = {
    title: 'Aca Contracting',
    description: '',
};

export default async function AcaContractingPage() {
    const insuranceData = [];
    try {
        const response = await axios.get(API_URL + '/api/carriers');
        if (response?.data?.data && Array.isArray(response.data.data)) {
            for(const carrier of response.data.data) {
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
    catch (error) {
        console.error("Error fetching carriers:", error);
    }


    return (
        <MainLayout>
            <div className="contract-page-wrap">
                <ContractingForm insuranceData={insuranceData} />
                {insuranceData.length > 0 &&
                    <InsuranceSection insuranceData={insuranceData}/>
                }
            </div>
        </MainLayout>
    );
}

