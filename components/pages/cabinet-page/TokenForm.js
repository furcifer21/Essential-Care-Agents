'use client'

import React, {useEffect, useState} from "react";
import {CLIENT_API_URL} from "../../constants";
import {useRouter, useSearchParams} from 'next/navigation';
import axios from "axios";
import {toast} from "sonner";
import {useAuthStore, useCacheStore} from "../../storage";
import {fetchAgentProfile, updateCacheData} from "../../helper";

export default function TokenForm() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);
    const { usStates, usTimezones, usCarriers, setStates, setTimezones, setCarriers } = useCacheStore();
    const [isLogged, setIsLogged] = useState(false);

    const searchParams = useSearchParams();
    const signToken = searchParams.get('token');

    const localFetchUser = async () => {
        try {
            const user = await fetchAgentProfile(signToken);
            if (user) {
                user.producerAgreementNo = user.producer_agreement_no;
                user.producerAgreementDate = user.producer_agreement_date ? new Date(user.producer_agreement_date) : '';
                user.feeAgreementNo = user.fee_agreement_no;
                user.feeAgreementDate = user.fee_agreement_date ? new Date(user.fee_agreement_date) : '';
                setAuth(signToken, user);
                // toast.success(`You are logged in as ${user.first_name} ${user.last_name}.`);
                if(!usStates || !usTimezones || !usCarriers) {
                    const cache =await updateCacheData();
                    setStates(cache.states);
                    setTimezones(cache.timezones);
                    setCarriers(cache.carriers);
                }

                router.push('/cabinet/my-portal'); // Redirect to the cabinet page on successful login
            }
            else {
                toast.error('You can`t be logged in automatically. No Agent found by token');
                router.push('/login');
            }
        }
        catch (e) {
            toast.error('You can`t be logged in automatically.');
            router.push('/login');
        }
    }

    useEffect( () => {
        if(!isLogged) {
            localFetchUser();
        }
    })

    return (
        <></>
    );
}
