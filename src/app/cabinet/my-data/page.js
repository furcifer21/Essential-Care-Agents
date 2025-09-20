"use client";

import React, {useEffect, useState} from "react";
import {redirect, useRouter} from "next/navigation";
import MainLayout from "../../../../components/MainLayout";
import { useAuthStore, useCacheStore } from "../../../../components/storage";
import AvatarUploader from "../../../../components/pages/cabinet-page/AvatarUploader";
import {Box, FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import {fetchAgentProfile, updateAgentTimezone, updateCacheData} from "../../../../components/helper";
import axios from "axios";

import Link from "next/link";
import {CLIENT_API_URL} from "../../../../components/constants";
import {toast} from "sonner";
import {maxHeight} from "@mui/system";

export default function MyDataPage() {
    const {token, user, isHydrated, setAuth} = useAuthStore();
    const { usStates, usTimezones, usCarriers, setStates, setTimezones, setCarriers } = useCacheStore();
    const [selectedTZ, setSelectedTZ] = useState('CDT/Central Daylight Time');


    const router = useRouter();

    const localFetchData = async () => {
        if(!usStates || !usTimezones || !usCarriers) {
            const cache = await updateCacheData();
            setStates(cache.states);
            setTimezones(cache.timezones);
            setCarriers(cache.carriers);
        }
    }

    const localUpdateTimezone = async (tzId) => {
        setSelectedTZ(tzId);
        await updateAgentTimezone(token, tzId);
        toast.success('Timezone updated successfully.');
        const user = await fetchAgentProfile( token);
        setAuth(token, user);
    };

    useEffect(() => {
        if (!isHydrated) {
            // Ждем, пока Zustand восстановит состояние
            return;
        }
        if (!token) {
            router.push('/login');
            return;
        }
        localFetchData().then(
          () => (user?.timezone_id) ? setSelectedTZ(user.timezone_id) : null,
        );
    }, [token, router, isHydrated]);

    return (
        <MainLayout isAuth>
            <section className="outer-section-margin">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 mb-4 mb-md-0">
                            <AvatarUploader user={user} isHydrated={isHydrated} token={token} />
                        </div>
                        <div className="col-md-3 mb-4 mb-md-0">
                            <div className="mydata-card bg-transparent d-flex flex-column align-items-start justify-content-start mt-5" style={{maxHeight:'89px'}}>
                                <div className={"mydata-card__title"}>Full Name:</div>
                                <div className={"mydata-card__text"}>{user?.first_name} {user?.last_name}</div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row mb-4">
                                <div className="col-md-3 mb-4 mb-md-0">
                                    <div className="mydata-card bg-transparent d-flex flex-column align-items-start justify-content-start">
                                        <div className={"mydata-card__title"}>Email:</div>
                                        <div className={"mydata-card__text"}>{user?.email}</div>
                                    </div>
                                </div>
                                <div className="col-md-3 mb-4 mb-md-0">
                                    <div className="mydata-card bg-transparent d-flex flex-column align-items-start justify-content-start">
                                        <div className={"mydata-card__title"}>NPN:</div>
                                        <div className={"mydata-card__text"}>{user?.npn}</div>
                                    </div>
                                </div>
                                <div className="col-md-3 mb-4 mb-md-0">
                                    <div className="mydata-card bg-transparent d-flex flex-column align-items-start justify-content-start">
                                        <div className={"mydata-card__title"}>Residence state:</div>
                                        <div className={"mydata-card__text"}>{user?.state?.state_name}</div>
                                    </div>
                                </div>
                                <div className="col-md-3 mb-4 mb-md-0">
                                    <div className="mydata-card bg-transparent d-flex flex-column align-items-start justify-content-start">
                                        <div className={"mydata-card__title"}>Phone:</div>
                                        <div className={"mydata-card__text"}>{user?.phone}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-md-12 mb-4 mb-md-0">
                                    <div className="mydata-card bg-transparent d-flex flex-column align-items-start justify-content-start">
                                        <div className={"mydata-card__title"}>Address</div>
                                        <div className={"mydata-card__text"}>{user?.address}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-md-12 mb-4 mb-md-0">
                                    <div className="mydata-card bg-transparent d-flex flex-column align-items-start justify-content-start">
                                        <div className={"mydata-card__title"}></div>
                                        <div className={"mydata-card__text"}>
                                            <FormControl>
                                                <InputLabel id="timezone-label">Select your timezone</InputLabel>

                                                <Select
                                                  labelId="timezone-label"
                                                  value={selectedTZ}
                                                  label="Select your timezone"
                                                  onChange={
                                                      (e) => localUpdateTimezone(e.target.value)
                                                  }
                                                >
                                                    { usTimezones && usTimezones.map((tz) => (
                                                      <MenuItem key={tz.id} value={tz.id} >
                                                          (GMT{tz.timezone}) {tz.id}
                                                      </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
