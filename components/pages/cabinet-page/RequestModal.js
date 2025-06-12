'use client'
// components/RequestModal.jsx
import React, {useRef, useState} from 'react';
import {ReCAPTCHA} from "react-google-recaptcha";
import {useForm} from "react-hook-form";
import {useOutsideClick} from "../../helper";
import axios from "axios";
import {CLIENT_API_URL} from "../../constants";
import {toast} from "sonner";
import useAuthStore from "../../../components/storage";


export default function RequestModal({ isOpen, onClose, data, formData }) {
    const recaptchaRef = useRef();
    const multiSelectRef = useRef();
    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const selectedStates = watch('appointedStates') || [];
    const { token } = useAuthStore();

    useOutsideClick(multiSelectRef, () => {
        setDropdownOpen(false);
    })

    if (!isOpen) return null;

    const toggleState = (state) => {
        const current = new Set(selectedStates);
        if (current.has(state)) current.delete(state);
        else current.add(state);
        setValue('appointedStates', Array.from(current), { shouldValidate: true });
    };

    const onSubmit = async (data) => {
        /* const recaptchaValue = recaptchaRef.current?.getValue();
         if (!recaptchaValue) {
             alert("Please complete the reCAPTCHA");
             return;
         }*/

        try {
            await axios.post(CLIENT_API_URL + '/api/contract/create', {
                'market_id': data.markets === 'ACA'? 1 : data.markets === 'Medicare'? 2 : 3,
                'carrier_id': formData.carrierId,
                'state_ids': data.appointedStates,
                },
              {
                  headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json',
                  },
              })
            toast.success('Your request has been sent successfully. We will contact you soon.');
        }
        catch (e) {
            toast.error('We have an issue with sending your request. ' + e.message);
        }
        reset();
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <h2>Request Form</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Markets (Single Select):</label>
                        <select {...register('markets', { required: 'Market is required' })}>
                            <option value="">Select one</option>
                            {data?.markets?.split(',').map((market, index) => (
                                <option key={index} value={market.trim()}>
                                    {market.trim()}
                                </option>
                            ))}
                        </select>
                        {errors.markets && <span className="error">{errors.markets.message}</span>}
                    </div>

                    <div className="form-group">
                        <label>Appointed States:</label>
                        <div ref={multiSelectRef} className="custom-multiselect">
                            <div className="multiselect-input" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                {selectedStates.length > 0 ? selectedStates.join(', ') : 'Select states'}
                            </div>
                            {dropdownOpen && (
                                <div className="multiselect-dropdown">
                                    {data?.appointedStates?.split(',').map((state, i) => {
                                        const s = state.trim();
                                        const isSelected = selectedStates.includes(s);
                                        return (
                                            <div
                                                key={i}
                                                className={`multiselect-option ${isSelected ? 'selected' : ''}`}
                                                onClick={() => toggleState(s)}
                                            >
                                                {s}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        {errors.appointedStates && (
                            <span className="error">Select at least one state</span>
                        )}
                    </div>

                    <div>
                        <ReCAPTCHA
                            sitekey="your-recaptcha-site-key"
                            ref={recaptchaRef}
                        />
                    </div>

                    <button type="submit" className="btn-basic w-100 justify-content-center">REQUEST CONTRACTING</button>
                </form>
            </div>
        </div>
    );
}
