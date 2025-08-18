'use client'
import React from 'react';
import {useRouter} from "next/navigation";
import Link from "next/link";
import {FORM_PRODUCER_AGREEMENT_LINK} from "../../constants";


export default function ProducerAgreementModal({ isOpen, onClose, onClick}) {
    const router = useRouter();
    if (!isOpen) return null;

    return (
        // <div className="modal-overlay" onClick={onClose}>
        <div className="modal-overlay">
            {/*<div className="agreements-modal" onClick={(e) => e.stopPropagation()}>*/}
            <div className="agreements-modal">
                {/*<button className="modal-close text-main" onClick={onClose}>×</button>*/}
                <div className="row mb-4">
                  <div className="col-12 text-center text-main">
                    To continue processing your request, you must sign an agreement with Essential Care.
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 text-center">
                    <Link href={FORM_PRODUCER_AGREEMENT_LINK} onClick={onClick} target='_blank' className="btn-basic d-none d-xl-inline-flex py-2">Review and Sign the Producer Agreement</Link>
                  </div>
                </div>
            </div>
        </div>
    );
}
