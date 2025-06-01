import React from "react";
import Image from "next/image";
import {API_URL, IMAGE_API_URL} from "../../constants";

export default function InsuranceSection({insuranceData}) {
    return (
        <section className="insurance-section section-margin position-relative text-center">
            <div className="container">
                <div className="insurance-item-wrap d-flex flex-column">
                    {insuranceData.map((item) => {
                        return (
                            <div key={`insurance-${item.id}`} className="insurance-item">
                                <div className="insurance-item__img mb-3 position-relative d-flex align-items-center justify-content-center">
                                    <img src={IMAGE_API_URL + item.logo}
                                         alt={`${item.name} logo`}
                                         style={{
                                           maxWidth: '100%',
                                           maxHeight: '100%',
                                           width: 'auto',
                                           height: 'auto',
                                           objectFit: 'contain'
                                         }}
                                    />
                                </div>
                                {item.products_info &&
                                    <>
                                        <h4 className="mb-2">Product Availability:</h4>
                                        <div className="mb-4 pb-2">
                                            <span>
                                              {item.products_info}
                                            </span>
                                        </div>
                                    </>
                                }
                                {item.states_info &&
                                    <>
                                        <h4 className="mb-2">State Availability:</h4>
                                        <div className="mb-4 pb-2">
                                            <span>
                                              {item.states_info}
                                            </span>
                                        </div>
                                    </>
                                }
                                <div className="insurance-item__bottom-border d-flex">
                                    <div className="w-50"></div>
                                    <div className="w-50"></div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
