import React from "react";

export default function StatsBlock() {
    const statArr = [
        `Enrolled <span>3M+</span> consumers`,
        `Submitted <span>1.2M+</span> EDE enrollments`,
        `Used by <span>36,000</span> agents`,
        `Support <span>100</span> Percent EDE-approved carriers`,
        `<span>20</span> Percent Higher effectuation vs. DE*`,
        `<span>14</span> Percent Higher self-serve rate vs. DE*`,
        `<span>8</span> Min application vs. 30 min DE*`,
    ]
    return (
        <section className="stats-section section-margin">
            <div className="container">
                <h2 className="mb-5 text-center">The Stats <span className="fw-bold">Don't Lie...</span></h2>
                <div className="row justify-content-center">
                    <div className="col-10 col-md-5 mb-4 mb-md-0">
                        <div className="certification-agents-card w-100">
                            <h4>What is EDE?</h4>
                            <div className="p-3">
                                <p>
                                    EDE (Enhanced Direct Enrollment) is a powerful new
                                    technology that simplifies the enrollment process and
                                    provides complete policy management functionality—without going to Healthcare.gov.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-10 col-md-5">
                        <ul>
                            {statArr.map((item, i) => {
                                return (
                                    <li key={`stat-${i}`} dangerouslySetInnerHTML={{__html: item}}></li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
