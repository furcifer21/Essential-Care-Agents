"use client";
import React, {useEffect, useState} from "react";
import MainLayout from "../../../../components/MainLayout";
import TableBlock from "../../../../components/pages/cabinet-page/TableBlock";
import {redirect, useRouter} from "next/navigation";
import {getCookie} from "../../../../components/helper";
import axios from "axios";
import {CLIENT_API_URL} from "../../../../components/constants";
import useAuthStore from "../../../../components/storage";
import {toast} from "sonner";
import RequestModal from "../../../../components/pages/cabinet-page/RequestModal";
import AgreementsModal from "../../../../components/pages/cabinet-page/AgreementsModal";

// export const metadata = {
//     title: 'My Contracting',
//     description: '',
// };

export default function MyCommissionsAgreementPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);

  const {token, user, isHydrated} = useAuthStore();
  const router = useRouter();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!isHydrated) {
      // Ждем, пока Zustand восстановит состояние
      return;
    }
    if (!token) {
      router.push('/login');
    }

  }, [token, router, isHydrated]);

  return (
    <MainLayout isAuth>
      <section className="section-margin p-0 pt-3">
        <div className="container pt-3">
          <h1 className="mb-3 text-center">ESSENTIAL CARE ADMINISTRATION FEE AGREEMENT
            AND BUSINESS ASSOCIATE AGREEMENT
          </h1>
          <section className="insurance-section section-margin position-relative p-0 py-4 px-5">
            <p>
              This Administration Fee Agreement (the “Agreement”) is entered between ESSENTIALS81 CORP D.B.A. ESSENTIAL
              CARE LIFE AND HEALTH INSURANCE AGENCY (“ESSENTIAL CARE”) and the Undersigned Authorized Representative
              (“Producer”). The Effective Date of this Agreement shall be the signature field Date indicated by the last
              Party to execute the Agreement. Essential Care and Producer are herein each a “Party” and collectively, the
              “Parties”.
            </p>
            <p>
              In exchange for providing administrative, marketing, and compliance oversight services,
              including, but not limited to, assisting with agent recruiting, contracting, training, marketing, and
              pre and post-sale member support for life and health insurance carrier (the “Carrier” or “Carriers”)
              products, Essential Care agrees to pay Producer compensation at fair market value for business written
              through Producer and Producer’s recruited agents for plans effective between January 1 and December 31 of
              the current year, hereafter referred to as “Administration Fees”.
            </p>
            <p>
              <strong><u>Essential Care as Exclusive GA, NMO, FMO, or IMO (“Upline”) for the Carriers</u></strong><br/>
              Producer agrees that it shall utilize Essential Care as its exclusive GA, NMO, FMO, or IMO for all the
              Carriers for which Producer shall be compensated under this Agreement. If any of Producer’s downline
              agents (“agents”) or downline agencies (“agencies”) are already contracted under another GA, NMO, FMO, or
              IMO for the Carriers at the Effective Date of this Agreement, then Producer shall make all reasonable
              efforts to secure a release from the current Upline to be aligned under Essential Care. Producer agrees
              that it shall not direct, recommend or encourage any of its agents or agencies to contract through another
              Upline for any of the Carriers during the term of this Agreement.
            </p>
            <p>
              <strong><u>Requirement to Maintain License, Appointment</u></strong><br/>
              Producer or Producer’s principal agent must maintain an active appointment with the Carriers through
              Essential Care, if applicable, remain duly licensed in all applicable jurisdictions, and maintain Errors
              and Omissions coverage. Failure of Producer or Producer’s principal agent to maintain an active resident
              life and/or health license, as applicable to the Carrier line of business, will result in immediate
              termination of this Agreement.
            </p>
            <p>
              <strong><u>Affiliation, Releases and Producer’s Vested Interest</u></strong><br/>
              Essential Care recognizes Producer’s right to request a release for itself and its agents and agencies. As
              such, Essential Care agrees to release Producer and its agents and agencies upon written request. Producer
              acknowledges that each Carrier’s release process is unique, and as such, the agents may be required to
              request individual releases from Essential Care. Producer agrees that it is Producer’s responsibility to
              execute the release with the relevant Carrier(s). Essential Care further agrees to adhere to payment terms
              made to the benefit of Producer post-release for member contracts which remain active for the duration of
              said member contract.
            </p>
            <p>
              <strong><u>Minimum Producing Agents</u></strong><br/>
              Producer must maintain at least 2 producing agents to be eligible for Administration Fees.
            </p>
            <p>
              <strong><u>Payment Terms</u></strong><br/>
              1) Administration Fees Schedule, Direct Deposit and Form W-9. The Administration Fees Schedule is attached
              hereto as Schedule A. Producer must complete Agility’s direct deposit form and IRS Form W-9 to receive
              Administration Fees.
            </p>
            <p>
              2) Payment. Administration Fees shall be paid by direct deposit within 30 days that payment is made by the
              Carriers to Essential Care. To calculate and pay Administration Fees, Essential Care will use commercially
              reasonable standards to identify policies written by Producer or its agents from the Carrier commission
              statements.
            </p>
            <p>
              3) Notice of Deficiencies. If Administration Fees on policies written by Producer or its agents are not
              paid to Producer, Producer shall notify Essential Care of such deficiency within 120 days of the first day
              of the commissions month of the unpaid policy.
            </p>
            <p>
              4) Payment of Commissions to Agents.<br/>
              a) Payment by Essential Care. In instances where Carrier’s contract Agility to pay the commissions to
              agents, Producer shall coordinate with the agent for the collection of IRS Form W-9 and a Direct Deposit
              Form that is acceptable to Essential Care.<br/>
              b) Payment by Producer. At Producer’s request, Producer may accept the obligation of
              paying Carrier commissions owed to agents. In those instances, Producer shall contract the agent as a
              “Licensed Only Agent”, “Sub producer”, or similar designation with the Carriers. If such
              options are not available; Producer shall contract the agent under Essential Care and provide an executed
              Assignment of Commissions form between Producer and the agent in a form that is acceptable to Essential
              Care.<br/>
            </p>
            <p>
              5) Payment of Administration Fees to an Agency. Upon 30 days written notice, Producer may
              request that Essential Care pay an agency all or a portion of Producer’s Administration Fees as
              compensation to the agency for the performance of the same services for which Essential Care has
              contracted the Producer under this Agreement. Producer acknowledges and agrees that Essential Care is not
              responsible to the agency for any obligations, and such payment to the agency does not create or imply any
              agreement or relationship between Essential Care and the agency.
            </p>
            <p>
              FURTHERMORE,<br/>
              PRODUCER AGREES TO INDEMNIFY, DEFEND, AND HOLD ESSENTIAL CARE HARMLESS FROM ANY CLAIMS, LIABILITIES,
              LOSSES, OR DAMAGES ARISING OUT OF OR RELATED TO THE PRODUCER’S CONTRACT WITH THE AGENCY OR ANY DISPUTES
              BETWEEN THE PRODUCER AND THE AGENCY.
            </p>
            <p>
              Administration Fees owed to Producer shall be reduced by the amount of Administration Fees owed and paid
              by Essential Care to the agency. Essential Care and Producer shall not compensate agents any portion of
              the Administration Fees based on the personal production of Medicare Advantage or Prescription Drug Plans
              by the agent.
            </p>
            <p>
              <strong><u>Indebtedness</u></strong><br/>
              Producer shall be responsible for and agrees to reimburse and indemnify Essential Care for any unearned or
              improperly or mistakenly paid Administration Fees. Essential Care may withhold, deduct and apply all sums
              due which would otherwise be due and payable to Producer to reduce any indebtedness.
            </p>
            <p>
              Essential Care may withdraw any money deposited to Producer’s account for improperly or mistakenly paid
              Administration Fees. Essential Care may, in its sole discretion, demand full payment of any indebtedness
              that remains outstanding for more than thirty (30) days. Producer agrees to pay Essential Care any and all
              indebtedness immediately upon demand.
            </p>
            <p>
              <strong><u>Governing Law and Settlement of Disputes</u></strong><br/>
              The laws of the State of New York, without regard to the internal law of &nbsp;New York regarding
              conflicts of law, govern the construction and enforcement of this Agreement. If a dispute arises between
              the parties in connection with this Agreement, Essential Care and Producer agree to first submit the
              dispute to mediation and, if not resolved, to binding arbitration as described below. The provisions of
              this Article shall also apply to disputes, as described herein, between Essential Care and Producer and
              its assigns.
            </p>
            <p>
              1) Mediation. Venue for the mediation shall be Kings County, New York and the mediation shall be
              conducted in Kings County, New York, by a mediator chosen from names of mediators furnished by the
              Association of Attorney-Mediators (&ldquo;AAM&rdquo;). If the parties cannot agree on a mediator, they
              will ask AAM to select a mediator not previously chosen by either, and such request will be made by both
              parties after either party, having attempted to agree with the other party regarding the selection of a
              mediator, determines that agreement cannot be obtained in the selection of a mediator. The mediation will
              be non-binding and will be conducted under the rules of mediation then in effect in the District Courts of
              Kings County, New York, and each party will pay one-half of the mediator&rsquo;s fees. Each party will
              bear its own costs. Parties attending and participating in the mediation shall have the authority to
              settle the dispute.
            </p>
            <p>
              2) Arbitration. If the mediation does not result in a settlement, the parties agree that the matter shall
              be settled by binding arbitration in Brooklyn, Kings County, New York, administered by the American
              Arbitration Association (&ldquo;AAA&rdquo;) and conducted by a sole arbitrator in accordance with the
              AAA&rsquo;s Commercial Arbitration Rules (&ldquo;Rules&rdquo;). The arbitration shall be governed by the
              Federal Arbitration Act, 9 U.S.C. &sect;&sect; 1-16, to the exclusion of state laws inconsistent therewith
              or that would produce a different result, and judgment on the award rendered by the arbitrator may be
              entered by any court having jurisdiction thereof. Except as may be required by law or to the extent
              necessary in connection with a judicial challenge, or enforcement of an award, neither a party nor the
              arbitrator may disclose the existence, content, record or results of an arbitration.
            </p>
            <p>
              Fourteen (14) calendar days before the hearing, the parties will exchange and provide to the arbitrator
              (a) a list of witnesses they intend to call (including any experts) with a short description of the
              anticipated direct testimony of each witness and an estimate of the length thereof, and (b) pre-marked
              copies of all exhibits they intend to use at the hearing. Depositions for discovery purposes shall not be
              permitted. The arbitrator may award only monetary relief and is not empowered to award damages other than
              compensatory damages. Nothing in this section nullifies either Party&rsquo;s right to terminate this
              Agreement pursuant to any other provisions in the Agreement.
            </p>
            <p>
              <strong><u>Confidentiality</u></strong><br/>
              Confidential Information. The term &ldquo;Confidential
              Information&rdquo; means information not generally&nbsp;known to the public in any form or media, whether
              received before or after the Effective Date, that relates to a Party&rsquo;s business and that is provided
              or made available to Producer by Essential Care, or any person or entity providing products or services to
              Essential Care or is provided or made available to Essential Care by Producer pursuant to this Agreement.
              A Party may label the information it considers Confidential Information but is not required to do so.
              Confidential Information includes any such information that (i) is marked as confidential at the time of
              disclosure, (ii) is unmarked (e.g., disclosed orally or visually) but is clearly identified as
              confidential at the time of disclosure, or (iii) due to the circumstances of disclosure or the nature of
              the information, should reasonably be considered Confidential Information. Confidential Information also
              includes, but is not limited to, the category of &ldquo;Business Confidential
              Information&rdquo; (&ldquo;BCI&rdquo;), such as trade secrets, product pricing, access to information
              systems, business strategy, client accounts or financial data.
            </p>
            <p>
              1) Limited Access and Use<br />
              a) The Receiving Party agrees to treat the Confidential Information as confidential to and as the property
              of the Disclosing Party and to use a reasonable degree of care (which, in any case, will not be less than
              the degree of care it uses with respect to its own information of like nature) to prevent disclosure of
              the Confidential Information of the Disclosing Party. The Receiving Party will use Confidential
              Information only for the purposes of evaluating and executing business arrangements between the Parties.
              The Receiving Party will not, except as required by applicable law or as otherwise permitted by this
              Agreement, disclose the terms of this Agreement or Confidential Information, except to the Receiving
              Party&rsquo;s U.S. majority owned or controlled subsidiaries or other affiliates and its and their
              respective officers, directors, employees, consultants, advisors, agents, accountants, auditors and
              attorneys (collectively, the &ldquo;Representatives&rdquo;) who the Receiving Party determines have a need
              to know such Confidential Information in connection with the business arrangements under discussion
              between the Parties and who have been advised of the obligation of confidentiality and who are obligated
              to keep the information confidential subject to a binding obligation at least as restrictive as this
              Agreement.<br/>
              The Receiving Party shall be responsible for any breach of the confidentiality obligations in this
              Agreement by its Representatives.<br/>
              b) The Receiving Party will not copy or reproduce the Confidential Information except as reasonably
              required to accomplish the purposes contemplated in this Agreement and will ensure that any
              confidentiality or other proprietary rights notices on the Confidential Information are reproduced on all
              copies.<br/>
              Upon the Disclosing Party&rsquo;s written request, which request may be made at any time during the term
              of this Agreement, all Confidential Information in the possession of the Receiving Party or its
              Representatives (including, without limitation, any and all copies of any Confidential Information (or
              notes or other work product incorporating any such Confidential Information), will be promptly and
              securely returned by the Receiving Party to the Disclosing Party or, if so directed by the Disclosing
              Party, destroyed by the Receiving Party. An authorized Representative of the Receiving Party, if requested
              by the Disclosing Party in writing, shall certify, on behalf of the Receiving Party, that all such
              Confidential Information has been securely returned or destroyed, as applicable. The Receiving Party may
              retain (i) copies of the Confidential Information to the extent required by applicable law or regulation,
              provided, however, that such Confidential Information remains subject to the terms and conditions of this
              Agreement an (ii) computer records and files containing Confidential Information which have been created
              pursuant to its automatic electronic archiving and back-up procedures, so long as it agrees to apply the
              protections in this Agreement to such Confidential Information.<br/>
              c) Nothing in this Agreement shall prohibit the Receiving Party from using any Confidential Information
              then in its possession in connection with any suit, action or proceeding arising out of or relating to the
              business arrangements under discussion solely for the purpose of defending itself, reducing its liability
              or protecting or exercising any of its rights, remedies or interests subject to an existing protective
              order.
            </p>
            <p>
              2) HIPAA. Both Parties shall comply with all applicable state and federal privacy Law including, but not
              limited to, laws governing the privacy of individual health information and the Health Insurance
              Portability and Accountability Act of 1996, and its implementing regulations, and the Health Information
              Technology for Economic and Clinical Health Act provisions of the American Recovery and Reinvestment Act
              of 2009, Pub. Law No. 111-5, and its implementing regulations. To the extent required thereunder, Agility
              shall enter into a Business Associate Agreement with Provider pursuant to 45 C.F.R. 164.502(e) and
              504(e).
            </p>
            <p>
              <strong><u>Business Associate Agreement</u></strong><br/>
              1) Essential Care and Producer acknowledge and agree that the Producer is a named Business Associate in
              this Agreement and is a &ldquo;Business Associate&rdquo; of Covered Entity as that term is defined by the
              Health Insurance Portability and Accountability Act and its implementing regulations (45 C.F.R. Parts
              160-164), and the Health Information Technology for Economic and Clinical Health Act, as incorporated in
              the American Recovery and Reinvestment Act of 2009, and its implementing regulations, each as issued and
              amended by the Secretary (all the foregoing, collectively &ldquo;HIPAA&rdquo;). Business Associate
              recognizes and agrees that it is obligated by law to meet the requirements of HIPAA that are applicable to
              Business Associates. The Parties hereby agree that the terms of this Agreement are specifically
              incorporated by reference into the underlying service Agreement and additional agreements or transaction
              documents (&ldquo;Other Agreement(s)&rdquo;).
            </p>
            <p>
              2) Business Associate agrees to use appropriate safeguards and security measures to prevent Use or
              Disclosure of Protected Health Information other than as provided for by this Agreement.<br/>
              Business Associate agrees to implement administrative, technical, and physical measures to protect the
              confidentiality, integrity, and availability of Protected Health Information as required by HIPAA.
            </p>
            <p>
              3) Business Associate agrees to enter into a written agreement with each Subcontractor (including,
              without limitation, a Subcontractor that is an agent under applicable law) that creates, receives,
              maintains or transmits Protected Health Information on behalf of Business Associate, which Agreement will
              both meet the requirements of 45 C.F.R. &sect;&sect; 164.504(e) and 164.314(a)(2) and obligate the
              Subcontractor to comply with restrictions and conditions that are at least as restrictive as the
              restrictions and conditions that apply to Business Associate under this Agreement.
            </p>
            <p>
              4) Business Associate agrees to allow Essential Care to enter into a written agreement with each Related
              Business Entity that creates, receives, maintains or transmits Protected Health Information and/or PII on
              behalf of Business Associate, which Agreement will both meet the requirements of 45
              C.F.R. &sect;&sect; 164.504(e) and 164.314(a)(2) and obligate the Related Business Entity to comply with
              restrictions and conditions that are at least as restrictive as the restrictions and conditions that apply
              to Essential Care under this Agreement; and Business Associate agrees to allow Essential Care to
              disseminate and/or transmits Protected Health Information and/or PII to Related Business Entities as
              necessary to facilitate legitimate business purposes not prohibited by state, federal or regulatory
              authorities. Likewise, Business Associate may use or disclose Protected Health Information for, or on
              behalf of, Covered Entity as specified herein, of this Agreement, provided such Use or Disclosure would
              not violate the minimum necessary and/or Limited Data Set requirements of HIPAA or any agreed upon minimum
              necessary requirements of Covered Entity.
            </p>
            <p>
              5) The Term of this Business Associate Agreement is effective as of the Effective Date and will terminate
              when all of the Protected Health Information provided by Covered Entity to Business Associate or created
              or received by Business Associate on behalf of Covered Entity, is destroyed or returned to Covered Entity,
              or, if it is infeasible to return or destroy Protected Health Information, protections are extended to
              such information, in accordance with the termination provisions in this Section. This Agreement will
              terminate upon termination of the Administrative Fee Agreement. The relevant portions of the Other
              Agreements as designated by Covered Entity, with notice to Business Associate, will terminate immediately
              upon termination of this Agreement except for any Agreement in which Business Associate no longer
              maintains or continues to have Access, Use or Disclosure of any Protected Health Information from Covered
              Entity.
            </p>
            <p>
              6) Attestation.<br/>
              a) Entity Relationship. Business Associate acknowledges that as a Third-Party Marketing Organization
              (TPMO) and Downstream-Related entity partnering with Covered Entity by participating in a dual contract
              relationship with one or more healthcare plans, that Business Associate must comply with all applicable
              federal, state and plan regulations. Following federal, state, and plan sponsor requirements, Covered
              Entity is required to participate in the auditing and monitoring of downstream entities that conduct sales
              and enrollment activities for government programs, i.e. Medicare Advantage and Prescription Drug Plans
              (MA, MAPD, PDP) and ACA Qualified Health Plans through the Federally-Facilitated Marketplace (FFM) and
              State-Based Exchanges (SBEs).<br/>
              b) Execution of this Document Constitutes Attestation Form Execution. Business Associate acknowledges that
              as a Third-Party Marketing Organization (TPMO) and Downstream-Related entity partnering with Covered
              Entity by participating in a dual contract relationship with one or more healthcare plans, that Business
              Associate must comply with all applicable federal, state and plan regulations. Following federal, state,
              and plan sponsor requirements, Covered Entity is required to participate in the auditing and monitoring of
              downstream entities that conduct sales and enrollment activities for government programs, i.e. Medicare
              Advantage and Prescription Drug Plans (MA, MAPD, PDP) and ACA Qualified Health Plans through the
              Federally-Facilitated Marketplace (FFM) and State-Based Exchanges (SBEs).<br/>
              c) Compliance, Conduct, and Fraud Waste and Abuse Policies. Business Associate acknowledges that the
              undersigned organization has implemented written compliance policies, procedures, and standards of conduct
              that comply with federal, state, and health plan regulations. It distributes them within 90 days of hire
              or contracting, when there are updates, and annually thereafter to all employees and contracted agents.
              For the sake of clarity, nothing in this Agreement shall be construed to prevent the Customer from itself
              performing or from acquiring services from other providers that are similar to or identical to the
              Services. Or in the alternative Business Associate acknowledges that the undersigned organization agrees
              to adopt and incorporate written compliance policies, procedures, and standards of conduct that comply
              with federal, state, and health plan regulations as received from Essentials81 Corp, D.B.A. Essential
              Care.; and distribute them within 90 days of hire or contracting, when there are updates, and annually
              thereafter to all employees and contracted agents.<br/>
              d) Exclusion / Disbarment Screening. Business Associate acknowledges that the undersigned organization
              currently performs exclusion screening prior to hiring or contracting and monthly thereafter to ensure no
              individual or entity is excluded from participating in federally funded programs. If an individual or
              entity appears on the exclusion list, they will be removed from any work-related directly or indirectly to
              federal health care programs. Or in the alternative Business Associate acknowledges that the undersigned
              organization agrees to, within five (5) business days of executing this attestation, perform exclusion
              screening prior to hiring or contracting and monthly thereafter to ensure no individual or entity is
              excluded from participating in federally funded programs; and commit to removing any individual or entity
              discovered on the exclusion list from any work-related directly or indirectly to federal health care
              programs.<br/>
              e) Document Retention. Business Associate acknowledges that the undersigned organization complies with
              federal, state, and plan requirements to retain all documents related to contracting, sales, marketing,
              and enrollment activities for a period of ten (10) years; and Business Associate further agrees to furnish
              said documents upon receipt of a written request from federal, state, health plan entities or Essential
              Care Compliance Officer. In the alternative, Business Associate acknowledges that the undersigned
              organization agrees to, within five (5) business days of executing this attestation, retain all documents
              related to contracting, sales, marketing, and enrollment activities for a period of ten (10) years; and
              further agrees to furnish said documents upon receipt of a written request from federal, state, health
              plan entities or Essential Care Compliance Officer.<br/>
              f) Training / Education. Business Associate acknowledges that the undersigned organization agrees to
              provide required training on general compliance, and fraud, waste, and abuse to all new and established
              employees (including temporary workers and volunteers) and downstream entities after hire or contracting
              and annually thereafter.<br/>
              g) Acknowledgment of Disclosure. Business Associate acknowledges that Essential Care&rsquo;s Compliance
              Officer and/or Essential Care&rsquo;s Corporate Representative may have to, from time to time, disclose
              all or part of this Business Association Agreement and/or Administrative Fee Agreement to federal, state,
              and/or health plan entities to satisfy a request for evidence pertaining to regulatory and/or compliance
              related concerns.<br/>
              h). Statement of Attestation. Business Associate acknowledges that the undersigned signature certifies
              that the above statements (a) thru (f) are true and that said obligations will be continually maintained
              and that a request to execute attestation forms will be made annually by Essential Care in a form best
              suited for reporting regulatory and/or compliance adherence to federal, state, and/or health plans.
            </p>
            <p>
              <strong><u>General Terms (Pertaining to Administrative Fee Agreement and BAA)</u></strong><br/>
              1) Essential Care and Producer shall comply with all applicable state and federal laws and regulations
              applicable to their businesses, their licenses, and the transactions into which they enter.
            </p>
            <p>
              2) Producer shall act in the best interest of Essential Care and the Carriers. Producer shall not permit
              other interests, activities, or responsibilities to interfere with Producer&rsquo;s faithful performance
              under this Agreement.
            </p>
            <p>
              3) Any notice required from the Parties under this Agreement shall be deemed given on the day such notice
              is disseminated via e-mail, and/or certified mail return, receipt requested from the undersigned&rsquo;s
              representative to the below identified signatory at the address provided hereunder.
            </p>
            <p>
              4) This Agreement (including any sub-agreements (i.e. BAA), amendments, attachments, addenda or
              schedules) is the complete and sole contract between the parties regarding the Administration Fees and
              supersedes any and all prior understandings or agreements between the parties whether oral or in writing
              on this subject matter.
            </p>
            <p>
              5) This Agreement shall be governed by the laws of the State of New York.
            </p>
            <p>
              6) Essential Care&rsquo;s liability, if any, for damages to Producer for any cause whatsoever arising out
              of or related to this Agreement, and regardless of the form of the action, shall be limited to
              Producer&rsquo;s actual damages. Essential Care shall not be liable for any indirect, incidental,
              punitive, exemplary, special, or consequential damages of any kind whatsoever sustained as a result of a
              breach of this Agreement or any action, inaction or alleged tortuous conduct or delay by Essential Care.
              Producer further waives any and all claims against the Carrier for damages to Producer for any cause
              whatsoever arising out of or related to this Agreement.
            </p>
            <p>
              7) Essential Care may modify this Agreement upon thirty (30) days prior written notice to Producer.
              Notwithstanding the foregoing, upon the enactment of any law or regulation, or any order or direction of
              any governmental agency affecting this Agreement, Essential Care may, by written notice to Producer, amend
              the Agreement in such manner as Essential Care determines necessary to comply with such law or regulation,
              or any order or directive of any governmental agency. Essential Care may provide written notice by letter,
              newsletter, electronic mail, or other media.
            </p>
            <p>
              8) In the event that either Party defaults or breaches any of the provisions of this Agreement, the other
              Party shall have the right to terminate this Agreement by giving written notice to the defaulting Party,
              provided, however, that if the said defaulting Party cures said default within thirty (30) days after said
              notice shall have been given, this Agreement shall continue in full force and effect. Essential Care, in
              conjunction with any and all remedies under any portion of the Agreement may withhold making payments to
              Producer/Business Associate during the time period between Producer/Business Associate is put on Notice of
              Breach and either the Agreement is terminated, or the Breach is cured (the earlier occurring event of the
              two). The failure on the part of either of the parties hereto to exercise or enforce any right conferred
              upon it hereunder shall not be deemed to be a waiver of any such right nor operate to bar the exercise or
              enforcement thereof at any time or times thereafter.
            </p>
            <p>
              9) During the term of the Agreement and for a period of 12 months thereafter, neither party will, either
              directly or indirectly (whether through its respective employees, independent contractors, consultants or
              otherwise), employ or engage, or solicit for employment or engagement, any employee, independent
              contractor, consultant, agent or representative of the other party who is directly involved with the
              performance of services hereunder. Nothing in this Section restricts general advertisements of employment
              or the rights of any employee of one party, on that employee&rsquo;s own initiative or in response to any
              general advertisement(s), to seek employment from the other party nor, under those circumstances, for the
              advertising party to hire that employee.
            </p>
            <p>
              10) The Initial Term of this Agreement shall commence on the Effective Date and remain in full force and
              effect until December 31 of the same year unless earlier terminated as provided herein. Thereafter, this
              Agreement shall renew automatically for successive one-year terms unless one party gives the other party
              ninety (90) days advance written notice before the end of the then current term.
            </p>
            <p>
              THIS AGREEMENT CONTAINS A BINDING ARBITRATION PROVISION THAT MAY BE ENFORCED BY THE PARTIES
            </p>
          </section>
          <section className="insurance-section section-margin position-relative p-0 py-4 px-5">
            <h3 className={'text-center fs-5 mb-4'}>
              SCHEDULE A<br/>
              ADMINISTRATION FEE SCHEDULE
            </h3>
            <p>The Administration Fee by Carrier is listed below and is effective as of 07/01/2025.</p>
            <p>
              <strong>Member Caps and Year Classification:</strong><br/>
              Per Member payment schedules are subject to member caps established by each Carrier, if any. The criteria for
              "New", "Initial", and "Renewal" are defined by CMS and/or the Carriers.
            </p>
            <p>
              <strong>Payment Schedule and Calculation Methods:</strong><br/>
              The schedule for Administration Fee payments, as well as whether they are calculated annually or monthly,
              depends on the specific payment schedules and calculation methods of each Carrier. Lump-sum payments listed as
              “per member per year” or “per policy per year” may be paid to Essential Care by the Carriers on a monthly or
              prorated basis. Therefore, Administration Fees follow the same payment schedule and calculation methods as
              those used by the Carriers and may be subject to true-up payments and/or chargebacks. The amounts listed in
              this Schedule A represent the total Administration Fees by Carrier and will be reduced by any amounts paid
              directly to Producer by the Carrier.
            </p>
            <p>
            <table className={'administrative-fee-table'}>
              <thead>
                <tr>
                  <th><strong>CARRIER</strong></th>
                  <th><strong>INITIAL<br/>(NEW ENROLLMENT)</strong></th>
                  <th><strong>FIRST YEAR RENEWAL</strong></th>
                  <th><strong>RENEWAL YEARS 2+</strong></th>
                </tr>
              </thead>
              <tbody>
              <tr>
                <td><strong>AETNA</strong></td>
                <td>$4.32</td>
                <td>$4.32</td>
                <td>$4.32
                </td>
              </tr>
              <tr>
                <td>
                  <strong>AMBETTER HEALTH</strong>
                </td>
                <td>
                  $4.32
                </td>
                <td>
                  $4.32
                </td>
                <td>
                  $4.32
                </td>
              </tr>
              <tr>
                <td>
                  <strong>AMERIHEALTH CARTITAS</strong>
                </td>
                <td>
                  $3.60
                </td>
                <td>
                  $3.60
                </td>
                <td>
                  $3.60
                </td>
              </tr>
              <tr>
                <td>
                  <strong>ANTHEM</strong>
                </td>
                <td>
                  $3.40
                </td>
                <td>
                  $3.40
                </td>
                <td>
                  $3.40
                </td>
              </tr>
              <tr>
                <td>
                  <strong>BCBS OF MICHIGAN</strong>
                </td>
                <td>
                  1% of paid premium
                </td>
                <td>
                  1% of paid premium
                </td>
                <td>
                  1% of paid premium
                </td>
              </tr>
              <tr>
                <td>
                  <strong>BCBS OF SOUTH CAROLINA</strong>
                </td>
                <td>
                  $2.72
                </td>
                <td>
                  $2.72
                </td>
                <td>
                  $2.72
                </td>
              </tr>
              <tr>
                <td>
                  <strong>BCBS OF TEXAS</strong>
                </td>
                <td>
                  1% of paid premium
                </td>
                <td>
                  0.5% of paid premium
                </td>
                <td>
                  0.5% of paid premium
                </td>
              </tr>
              <tr>
                <td>
                  <strong>CARESOURCE</strong>
                </td>
                <td>
                  $1.5
                </td>
                <td>
                  $1.5
                </td>
                <td>
                  $1.5
                </td>
              </tr>
              <tr>
                <td>
                  <strong>CHRISTUS HEALTH</strong>
                </td>
                <td>
                  $3
                </td>
                <td>
                  $3
                </td>
                <td>
                  $3
                </td>
              </tr>
              <tr>
                <td>
                  <strong>CIGNA</strong>
                </td>
                <td>
                  $3.60
                </td>
                <td>
                  $3.60
                </td>
                <td>
                  $3.60
                </td>
              </tr>
              <tr>
                <td>
                  <strong>HEALTHFIRST</strong>
                </td>
                <td>
                  $7
                </td>
                <td>
                  $5
                </td>
                <td>
                  $5
                </td>
              </tr>
              <tr>
                <td>
                  <strong>MEDICA</strong>
                </td>
                <td>
                  $4.80
                </td>
                <td>
                  $4.80
                </td>
                <td>
                  $4.80
                </td>
              </tr>
              <tr>
                <td>
                  <strong>MOLINA HEALTHCARE</strong>
                </td>
                <td>
                  $3.60
                </td>
                <td>
                  $3.60
                </td>
                <td>
                  $3.60
                </td>
              </tr>
              <tr>
                <td>
                  <strong>OSCAR HEALTH</strong>
                </td>
                <td>
                  $4.80
                </td>
                <td>
                  $4.80
                </td>
                <td>
                  $4.80
                </td>
              </tr>
              <tr>
                <td>
                  <strong>UNITEDHEALTHCARE ACA</strong>
                </td>
                <td>
                  Florida:$4.32
                </td>
                <td>
                  Florida:$4.32
                </td>
                <td>
                  Florida:$4.32
                </td>
              </tr>
              <tr>
                <td>
                  <strong>&nbsp;</strong>
                </td>
                <td>
                  All other states: $3.60
                </td>
                <td>
                  All other states: $3.60
                </td>
                <td>
                  All other states: $3.60
                </td>
              </tr>
              </tbody>
            </table>
            </p>
            <p className={'text-danger text-center fs-5'}><strong>You have successfully completed this Agreement. No further action is
              required. Thank you!</strong></p>
          </section>
        </div>
      </section>
    </MainLayout>
  );
}
