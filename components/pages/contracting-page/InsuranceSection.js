import React from "react";
import Image from "next/image";

export default function InsuranceSection({insuranceData}) {
    return (
        <section className="insurance-section section-margin position-relative text-center">
            <div className="container">
                <div className="insurance-item-wrap d-flex flex-column">
                    {insuranceData.map((item, i) => {
                        return (
                            <div key={`insurance-${i}`} className="insurance-item">
                                <div className="insurance-item__img mb-3 position-relative d-flex align-items-center justify-content-center">
                                    <Image src={`/images/logo.png`}
                                           fill
                                           alt={`insurance ${item.name}`}
                                           objectFit="contain"
                                    />
                                </div>
                                {item.products.length > 0 &&
                                    <>
                                        <h4 className="mb-2">Product Availability:</h4>
                                        <div className="mb-4 pb-2">
                                            {item.products.map((product, j) => {
                                                return (
                                                    <span key={`product-${i}-${j}`}>
                                                    {product}{(j !== item.products.length - 1) && ', '}
                                                </span>
                                                )
                                            })}
                                        </div>
                                    </>
                                }
                                {item.states.length > 0 &&
                                    <>
                                        <h4 className="mb-2">State Availability:</h4>
                                        <div className="mb-4 pb-2">
                                            {item.states.length > 0 && item.states.map((product, j) => {
                                                return (
                                                    <span key={`product-${i}-${j}`}>
                                                    {product}{(j !== item.states.length - 1) && ', '}
                                                </span>
                                                )
                                            })}
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
