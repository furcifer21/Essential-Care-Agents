"use client";

import { toast } from 'sonner';
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import {CLIENT_API_URL, RECAPTCHA_KEY} from "../../constants";
import {useRouter} from "next/navigation";
import {GoogleReCaptchaProvider, useGoogleReCaptcha} from "react-google-recaptcha-v3";
import ProducerAgreementModal from "./ProducerAgreementModal";
import {Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, useTheme} from "@mui/material";
import Tippy from '@tippyjs/react';

import 'tippy.js/dist/tippy.css';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const FormBlockContent = ({insuranceData, usaStates}) => {
    const router = useRouter();
    const theme = useTheme();

    const {
          register,
          handleSubmit,
          control,
          formState: { errors, isSubmitting },
          reset,
          watch,
          setValue,
          getValues
    } = useForm();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nonResidentStates, setNonResidentStates] = React.useState([]);
    const [needNonResidentStates, setNeedNonResidentStates] = React.useState(false);
    const [selectedCarriers, setSelectedCarriers] = useState([]);

    const selectedFileName = watch('attachment')?.[0]?.name ?? '';

    function validateFile(files) {
        if (!files || files.length === 0) return true;
        if (files.length > 1) return "Please select only one file";

        const file = files[0];
        const allowedTypes = [
            "application/pdf",
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "image/bmp",
            "image/svg+xml",
        ];

        if (!allowedTypes.includes(file.type)) return "Only image files or PDFs are allowed";

        const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSizeInBytes) return "File size should be less than 5MB";

        return true;
    }

    const onSubmit = async (data) => {
        if(!data.carriers || ! Array.isArray(data.carriers) || data.carriers.length < 3) {
            toast.error('Please select at least 3 ACA carriers.', {
              duration: 5000,
            });
            return;
        }
        for(const [carrier, states] of Object.entries(data.states)) {
          if(!states || states.length < 1) {
            toast.error('Please select at least 1 state for '+carrier, {
              duration: 5000,
            });
            return;
          }
        }


        if (!executeRecaptcha) {
          toast.error( 'reCAPTCHA not ready' ,{
            duration: 5000,
          });
          return;
        }
        executeRecaptcha('aca_contracting')
          .then((gRecaptchaToken) => {
            const sendData = [];

            for(const [key, value] of Object.entries(data.data)) {
              if (key !== 'carriers' && key !== 'List of Non - Resident Licenses') {
                sendData.push({label: key, value});
              }
            }

            for(let i = 1; i <= data.carriers.length; i++) {
              sendData.push({ label: `${i}. Requested carrier:`, value: data.carriers[i-1] });
              sendData.push({ label: `${i}. Requested states for ${data.carriers[i-1]}:`, value: data.states[data.carriers[i-1]].join(', ') });
            }

            if(data?.data['Do you have any Non - Resident Licenses'] === 'Yes' && Array.isArray(data?.data['List of Non - Resident Licenses'])) {
              sendData.push({
                label: `List of Non - Resident Licenses`,
                value: data?.data['List of Non - Resident Licenses'].join(', ')
              });
            }

            const formData = new FormData();
            formData.append("slug", "aca-contracting");
            formData.append("subject", "ACA Contracting Request");
            formData.append("aca_carriers", data.carriers.join('|'));
            formData.append("aca_states", JSON.stringify(data.states));
            sendData.forEach((element, index) => {
              formData.append(`data[${index}][label]`, element.label);
              formData.append(`data[${index}][value]`, element.value);
            })

            if (data.attachment?.[0] instanceof File) {
              formData.append('files[]', data.attachment[0]);
            }
            formData.append('g-recaptcha-response', gRecaptchaToken);
            return axios.post(CLIENT_API_URL + '/api/request-contracting', formData, {headers: { "Content-Type": "multipart/form-data"}})
          })
          .then((response) => {
            toast.success('We received your request contracting. Your request will pending until you sign the Producer Agreement.', {
              duration: 0,
            });
            setIsModalOpen(true);
          })
          .catch((e) => {
            toast.error('We have an issue with sending your request. ' + e.message, {
              duration: 0,
            });
            setIsModalOpen(false);
          })
    };

    const handleClick = () => {
      router.push('/');
    }

    const handleChangeNonResidentStates = (event) => {
      const {
        target: { value },
      } = event;
      setNonResidentStates(
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    const handleCarrierChange = (e) => {
      const { value, checked } = e.target;
      if(!checked) {
        const formStates = getValues('states');
        delete formStates[value];
        setValue('states',formStates);
      }
      else {
        setValue('states['+value+']',[]);
      }
      setSelectedCarriers((prev) =>
        checked ? [...prev, value] : prev.filter((v) => v !== value)
      );
    };

    function getStyles(value, nonResidentStates, theme) {
    return {
      fontWeight: nonResidentStates.includes(value)
        ? '600'
        : '400',
    };
  }

    return (
        <form className="contract-form w-100" onSubmit={handleSubmit(onSubmit)}>
            <h3>Which ACA carriers do you request?</h3>
            {insuranceData.map((item) => (
                <div className={'w-100 d-flex flex-row'} key={'insurance-item-' + item.id}>
                    <div key={`form-carrier-name-${item.id}`} style={{minWidth:'240px'}}>
                        <label className="mb-2">
                            <input type="checkbox"
                                    {...register(`carriers`)}
                                    value={item.name}
                                    onChange={handleCarrierChange}
                            />
                            <span className="ps-2">{item.name}</span>
                        </label>
                    </div>
                    {selectedCarriers.includes(item.name) && (
                        <div key={`form-carrier-states-${item.id}`} className={'w-100'} >
                            {item.states.map((state) => (
                                <label className={'d-inline-flex ps-1 pointer align-items-center'}>
                                    <input type="checkbox"
                                           className="statesCheckboxClass"
                                           {...register(`states[${item.name}]`)}
                                           value={state.id}
                                    />
                                  <Tippy content={state.state_name}>
                                    <span className="ps-1 small">{state.id}</span>
                                  </Tippy>
                                </label>
                            ))}
                        </div>
                    )}
                  </div>
              ))}

            <div className="d-flex flex-column mb-3">
              <label className="mb-0">First Name<span className={'text-orange'}>*</span></label>
                <input placeholder={`Your First Name`} className={'light-placeholder'} {...register('data[First Name]', { required: true, minLength: 2, maxLength: 255 })} />
                {errors.firstName && <span>First name is required (2–255 characters)</span>}
            </div>

            <div className="d-flex flex-column mb-3">
                <label className="mb-0">Last Name<span className={'text-orange'}>*</span></label>
                <input placeholder={`Your Last Name`} className={'light-placeholder'} {...register('data[Last Name', { required: true, minLength: 2, maxLength: 255 })} />
                {errors.lastName && <span>Last name is required (2–255 characters)</span>}
            </div>

            <div className="d-flex flex-column mb-3">
                <label className="mb-0">Email<span className={'text-orange'}>*</span></label>
                <input placeholder={`Your Email`}
                       className={'light-placeholder'}
                       {...register('data[Email]', {
                           required: 'Valid email is required',
                           pattern: {value: /^\S+@\S+$/i, message: 'Enter valid email',} })
                        }
                />
                {errors.email && <span>{errors.email.message}</span>}
            </div>

            <div className="d-flex flex-column mb-3">
                <label className="mb-0">Phone<span className={'text-orange'}>*</span></label>
                <input placeholder={`Your Phone`}
                    className={'light-placeholder'}
                    {...register('data[Phone]', {
                    required: true,
                    pattern: /^\+?[0-9]\d{1,14}$/
                })} />
                {errors.phone && <span>Valid phone number is required</span>}
            </div>

            <div className="d-flex flex-column mb-3">
                <label className="mb-0">Resident State</label>
                <input placeholder={`Your Resident State`}
                    className={'light-placeholder'}
                    {...register('data[Resident State]', { required: true, minLength: 2, maxLength: 255 })} />
                {errors.residentState && <span>Resident State is required</span>}
            </div>

            <div className="d-flex flex-column mb-2">
              <label className="mb-2">Do you have any Non - Resident Licenses?</label>
              <div className="d-flex">
                <label className="me-4">
                  <input type="radio" value="Yes" {...register('data[Do you have any Non - Resident Licenses]', { required: true })} />Yes
                </label>
                <label>
                  <input type="radio" value="No" {...register('data[Do you have any Non - Resident Licenses]')} />No
                </label>
              </div>
              {errors.nonResidentState && <span>This field is required</span>}
            </div>

          { watch("data[Do you have any Non - Resident Licenses]") === "Yes" &&
            <div className="d-flex flex-column mb-2">
                <label className="mb-2">List of Non - Resident Licenses:</label>
                <Select
                  {...register("data[List of Non - Resident Licenses]")}
                  id="nonresident-multiple-chip"
                  displayEmpty
                  multiple
                  value={nonResidentStates}
                  onChange={handleChangeNonResidentStates}
                  sx={{
                    // Inactive state border color
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ffffff", // Custom color for inactive border
                    },
                    // Hover state border color
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e8623c", // Custom color on hover
                    },
                    // Active (focused) state border color
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ffffff", // Custom color for active border
                    },
                    // Ensure no label offset
                    "& .MuiSelect-root": {
                      paddingTop: "8px", // Adjust padding to avoid label space
                    },
                    '& .MuiSelect-icon' : {
                      color: '#ffffff',
                    },
                  }}
                  renderValue={(selected) =>
                    selected.length === 0 ? (
                      <Box sx={{ color: "#ffffff" }}>Select Non - Resident Licenses...</Box>
                    ) : (
                    <Box sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 0.5
                    }}>
                      {selected.map((value) => (
                        <Chip sx={{
                          color: '#faf9fc',
                          backgroundColor: '#e8623c',
                        }}
                              key={value} label={value}
                        />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {usaStates.map((state) => (
                    <MenuItem
                      key={state.id}
                      value={state.id}
                      style={getStyles(state.id, nonResidentStates, theme)}
                    >
                      {state.state_name}
                    </MenuItem>
                  ))}
                </Select>
            </div>
          }



            <div className="d-flex flex-column mb-3">
                <label className="mb-0">NPN<span className={'text-orange'}>*</span></label>
                <input placeholder={`Your National Producer Number`}
                    className={'light-placeholder'}
                    {...register('data[NPN]', { required: true, minLength: 2, maxLength: 255 })} />
                {errors.npn && <span>NPN is required</span>}
            </div>

            <div className="d-flex flex-column mb-3">
                <label className="mb-2">Total ACA Sales</label>
                <select placeholder={``} {...register('data[Total ACA Sales]')}>
                    <option value="">Select...</option>
                    <option value="0-50">0–50</option>
                    <option value="51-100">51–100</option>
                    <option value="101+">101+</option>
                </select>
            </div>

            <div className="d-flex flex-column mb-2">
                <label className="mb-2">Are you 2025 FFM Certified?</label>
                <div className="d-flex">
                    <label className="me-4"><input type="radio" value="Yes" {...register('data[Are you 2025 FFM Certified]', { required: true })} /> Yes</label>
                    <label><input type="radio" value="No" {...register('data[Are you 2025 FFM Certified]')} /> No</label>
                </div>
                {errors.ffmCertified && <span>This field is required</span>}
            </div>

            <div className="d-flex flex-column mb-4">
                <label className="mb-2">Attach FFM Certificate (image or PDF)</label>

                <input
                    type="file"
                    id="file-upload"
                    accept="image/*,application/pdf"
                    {...register("attachment", { validate: validateFile })}
                    className="hidden-file-input"

                />

                <label htmlFor="file-upload" className={`custom-file-label ${selectedFileName ? 'selected' : ''}`}>
                    {selectedFileName || "Attach file"}
                </label>

                {errors.attachment && (
                    <span className="text-danger">{errors.attachment.message}</span>
                )}
            </div>

            <div className="d-flex flex-column mb-4">
                <label className="mb-2">Do you have additional agents you would like to contract?</label>
                <div className="d-flex">
                    <label className="me-4"><input type="radio" value="Yes" {...register('data[Do you have additional agents you would like to contract]', { required: true })} /> Yes</label>
                    <label><input type="radio" value="No" {...register('data[Do you have additional agents you would like to contract]')} /> No</label>
                </div>
                {errors.hasAdditionalAgents && <span>This field is required</span>}
            </div>

            <p className="mb-4">
                By completing this form, you authorize Essential Insurance Services ('Essential') to submit
                the selected carrier contract requests to the appropriate insurance companies on your behalf.
                You also authorize Essential to contact you by phone and email.
            </p>

            <button disabled={isSubmitting} type="submit" className="btn-basic w-100 justify-content-center">{isSubmitting ? 'REQUESTING...' : 'REQUEST CONTRACTING'}</button>

            <ProducerAgreementModal
              isOpen={isModalOpen}
              onClick={handleClick}
            />
        </form>
    );
}

export default function FormBlock({insuranceData, usaStates}) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
      <FormBlockContent insuranceData={insuranceData} usaStates={usaStates}/>
    </GoogleReCaptchaProvider>
  )
};