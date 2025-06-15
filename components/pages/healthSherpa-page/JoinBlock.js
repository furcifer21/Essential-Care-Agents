import Image from "next/image";
import React from "react";

export default function JoinBlock() {
    return (
        <section className="healthSherpa-join section-margin">
            <div className="container">
                <div className="row justify-content-center mb-4 mb-xl-5">
                    <div className="col-md-6 col-xl-5 mb-4 mb-xl-0">
                        <h3 className="mb-1">$0.00* = Your cost to participate</h3>
                        <h4 className="fw-normal mb-4">*No, seriously. It's FREE!</h4>
                        <p>
                            With HealthSherpa's faster and easier alternative to Healthcare.gov, you'll have
                            the leading technology you need to maximize your Marketplace experience.
                            Streamlining the enrollment process for FFM health insurance agents.
                        </p>
                    </div>
                    <div className="col-md-6 col-xl-5">
                        <div className="certification-agents-card w-100">
                            <h4>Your Join Code:</h4>
                            <div className="p-3">
                                <p>
                                    To join, sign up at <a href="https://healthsherpa.com/" className="text-decoration-none" target="_blank">HealthSherpa.com</a> and use the <strong>Join Code: b4fd</strong>
                                </p>
                                <a href="https://www.healthsherpa.com/?_agent_id=essential-care&joint_code=8ce251a0"
                                   className="btn-basic w-100 justify-content-center"
                                   target="_blank"
                                >
                                    Create Account
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6 col-xl-5 mb-4 mb-xl-0">
                        <div className="healthsherpa-img-wrap d-flex align-items-center">
                            <div className="healthsherpa-img position-relative me-4 flex-shrink-0">
                                <Image src={`/images/healthSherpa.jpg`}
                                       fill
                                       alt="healthsherpa logo"
                                       objectFit="contain"
                                />
                            </div>
                            <h3>Complete Your Registration with HealthSherpa:</h3>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-5">
                        <p>
                            <span className="fw-bold">Agility</span> has partnered with <span className="fw-bold">HealthSherpa</span>, an innovative healthcare technology
                            and the <span className="fw-bold">country's largest ACA agent enrollment platform.</span>
                        </p>
                        <div className="text-center text-md-start">
                            <a href="https://www.healthsherpa.com/?_agent_id=essential-care&joint_code=8ce251a0"
                               className="btn-secondary"
                               target="_blank"
                            >
                                Register Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
