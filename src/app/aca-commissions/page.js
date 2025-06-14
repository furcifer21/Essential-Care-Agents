import React from "react";
import ContractingForm from "../../../components/pages/contracting-page/ContractingForm";
import InsuranceSection from "../../../components/pages/contracting-page/InsuranceSection";
import MainLayout from "../../../components/MainLayout";
import axios from "axios";
import {API_URL, IMAGE_API_URL} from "../../../components/constants";
import Link from "next/link";

export const metadata = {
    title: 'Aca Commissions',
    description: '',
};

export default async function AcaCommissionsPage() {
    const insuranceData = [];
    try {
        const response = await axios.get(API_URL + '/api/carriers');
        if (response?.data?.data && Array.isArray(response.data.data)) {
            for(const carrier of response.data.data) {
                const item = {
                    id: carrier.id,
                    logo: `/storage/` + carrier.logo_path || '',
                    name: carrier.carrier_name || 'Unknown Carrier',
                    products_info: carrier.products_info || '',
                    states_info: carrier.states_info || '',
                    broker_portal_link: carrier.broker_portal_link || '',
                    commissions_image_path: `/storage/` + (carrier.commissions_image_path || ''),
                }
                insuranceData.push(item);
            }
        }
    }
    catch (error) {
        console.error("Error fetching carriers:", error);
    }


    return (
        <MainLayout>
            <div className="contract-page-wrap">
                <section className="insurance-section section-margin position-relative text-center">
                    <div className="container">
                        {insuranceData.map((item) => {
                            return (
                              <div key={`insurance-${item.id}`} className="insurance-item mb-2">
                                  <div className="d-flex align-items-center">
                                      <div className="insurance-item__img w-100 position-relative d-flex align-items-center">
                                          <img src={IMAGE_API_URL + item.logo}
                                               alt={`${item.name} logo`}
                                               style={{
                                                   maxWidth: '50%',
                                                   maxHeight: '100%',
                                                   width: 'auto',
                                                   height: 'auto',
                                                   objectFit: 'contain'
                                               }}
                                          />
                                      </div>
                                      <Link href={`/aca-contracting`} className={'btn-basic'} style={{marginLeft: 'auto'}}>Contracting</Link>
                                      { item.broker_portal_link &&
                                        <Link href={item.broker_portal_link} className={'btn-basic'} style={{marginLeft:'1em', whiteSpace:'nowrap'}}>Broker portal</Link>
                                      }
                                  </div>
                                  <div className="w-100 mt-4"><h2>{item.name}</h2></div>
                                  { item.commissions_image_path && item.commissions_image_path !== '/storage/' &&
                                      <div className="w-100">
                                          <img src={IMAGE_API_URL + item.commissions_image_path}
                                               alt={`${item.name} commissions image`}
                                               style={{
                                                   maxWidth: '100%',
                                                   maxHeight: '100%',
                                                   width: 'auto',
                                                   height: 'auto',
                                                   objectFit: 'contain'
                                               }}
                                          />
                                      </div>
                                  }
                              </div>
                            )
                        })}
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}

