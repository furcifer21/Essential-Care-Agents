'use client';
import React from "react";

export default function Footer() {

    return (
        <footer className="text-center py-3">
          <div className="container">
            <div className="row">
              <div className="col-6 text-start align-content-center" style={{ fontSize: '12px' }}>
                <span>© Copyright {new Date().getFullYear()} Essential Care. All Rights Reserved. This site is for agent use only. <br/>
                  Not affiliated with the United States government or the federal Medicare program. Not all products are available in all areas. Exclusions and limitations may apply.
                </span>
              </div>
              <div className="col-6 text-end align-content-center">
                <span className="social-container">
                  <a target="_blank" href="https://www.facebook.com/EssentialCareInsuranceAgency">
                    <img title="Facebook" src="https://ecagenthub.com/images/facebook-logo-colored.png" alt="Fb"/>
                  </a>
                  <a target="_blank" href="https://www.instagram.com/essentialcare.agency/?hl=en">
                    <img title="Instagram" src="https://ecagenthub.com/images/instagram-logo-colored.png" alt="Inst"/>
                  </a>
                  <a target="_blank" href="https://www.linkedin.com/in/essentialcarenyc">
                    <img title="Linkedin" src="https://ecagenthub.com/images/linkedin-logo-colored.png" alt="In"/>
                  </a>
                  <a target="_blank" href="https://www.youtube.com/@EssentialCareHealthInsurance/featured">
                    <img title="Youtube" src="https://ecagenthub.com/images/youtube-logo-colored.png" alt="Yt"/>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </footer>
    )
}