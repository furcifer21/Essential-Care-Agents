import React from "react";
import MainLayout from "../../../../components/MainLayout";
import TableBlock from "../../../../components/pages/cabinet-page/TableBlock";
import {redirect} from "next/navigation";
import {getCookie} from "../../../../components/helper";

export const metadata = {
    title: 'My Contracting',
    description: '',
};

const data = [
    {
        id: 1,
        carrier: 'Carrier A',
        status: 'Active',
        statusDate: '2024-04-01',
        writingNo: 'WR1234',
        appointedStates: 'NY, CA',
        markets: 'Health, Auto',
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

    return (
        <MainLayout isAuth>
            <section className="section-margin pt-3">
                <div className="container">
                    <h1 className="mb-3">My Contracting Report</h1>
                    <TableBlock tableData={data}/>
                </div>
            </section>
        </MainLayout>
    );
}
