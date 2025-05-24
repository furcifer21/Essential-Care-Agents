import React from "react";
import ContractingForm from "../../../components/pages/contracting-page/ContractingForm";
import InsuranceSection from "../../../components/pages/contracting-page/InsuranceSection";
import MainLayout from "../../../components/MainLayout";

export const metadata = {
    title: 'Aca Contracting',
    description: '',
};

export default function AcaContractingPage() {
    const insuranceData = [
        {
            logo: '/images/logo.png',
            name: 'Aetna CVS Health',
            products: ['ACA On and Off-Exchange Health Plans'],
            states: ['Arizona', 'California', 'Delaware', 'Florida', 'Georgia', 'Illinois', 'Indiana', 'Kansas', 'Maryland', 'Missouri', 'Nevada', 'New Jersey', 'North Carolina', 'Ohio', 'Texas', 'Utah and Virginia']
        },
        {
            logo: '/images/logo.png',
            name: 'Aetna CVS Health',
            products: [],
            states: ['Arizona', 'California', 'Delaware', 'Florida', 'Georgia', 'Illinois', 'Indiana', 'Kansas', 'Maryland', 'Missouri', 'Nevada', 'New Jersey', 'North Carolina', 'Ohio', 'Texas', 'Utah and Virginia']
        },
        {
            logo: '/images/logo.png',
            name: 'Aetna CVS Health',
            products: ['ACA On and Off-Exchange Health Plans'],
            states: []
        }
    ];

    return (
        <MainLayout>
            <div className="contract-page-wrap">
                <ContractingForm/>
                {insuranceData.length > 0 &&
                    <InsuranceSection insuranceData={insuranceData}/>
                }
            </div>
        </MainLayout>
    );
}
