import Image from "next/image";
import React from "react";

export default function StepsBlock() {
    const stepsArr = [
        {
            step: 1,
            text: 'Head over to HealthSherpa and click on the “For Agents” link.',
            image: ''
        },
        {
            step: 2,
            text: 'Click on the blue “Start Enrolling Faster” button.',
            image: ''
        },
        {
            step: 3,
            text: 'Enter your email address and password — and then click “sign up” (this email address will be your HealthSherpa login).',
            image: ''
        },
        {
            step: 4,
            text: 'Enter your name, company/agency name, preferred phone number, and select how you heard about us.',
            image: ''
        },
        {
            step: 5,
            text: 'Select the type of account you would like to open: “Join an existing agency”. An agent account linking up to an upline agency - Input Join Code B4FD.',
            image: ''
        },
        {
            step: 6,
            text: 'Choose each state and carrier you are licensed and appointed with as an agent (not at the agency level).',
            image: ''
        },
        {
            step: 7,
            text: 'Turn on the referral program — this is a great opportunity to get paid for ACA enrollments when you don’t have a contract with a specific carrier.',
            image: ''
        },
        {
            step: 8,
            text: 'Enter your FFM Username (also known as your CMS portal login) and provide your individual NPN, not the agency’s.',
            image: ''
        },
        {
            step: 9,
            text: 'Go through the National Insurance Producer Registry (NIPR) check (this must be authorized to finalize and open your account)',
            image: ''
        },
        {
            step: 10,
            text: 'Congratulations!! You’ve created a new HealthSherpa account!',
            image: ''
        }
    ]
    return (
        <section className="steps-section section-margin">
            <div className="container">
                <div className="row justify-content-center">
                    {stepsArr.map((item, i) => {
                        return (
                            <div key={`step-item-${i}`} className="col-10 col-md-5 mb-4 mb-xl-5">
                                <h4 className="text-orange">Step {item.step}</h4>
                                <p>{item.text}</p>
                                <div className="step-img position-relative">
                                    <Image
                                        src={`/images/steps/step-${item.step}.avif`}
                                        fill
                                        style={{ objectFit: 'contain' }}
                                        alt={`Step ${item.step}`}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
