"use client";
import React, {useEffect} from "react";
import MainLayout from "../../../../components/MainLayout";
import {useRouter} from "next/navigation";
import  { useAuthStore } from "../../../../components/storage";

export default function MyProducerAgreementPage() {

  const {token, isHydrated} = useAuthStore();
  const router = useRouter();

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
          <h1 className="mb-3 text-center">Essential Care Producer Agreement</h1>
          <section className="insurance-section section-margin position-relative p-0 py-4 px-5">
            <p><strong>THE AGREEMENT DETAILED BELOW GOVERNS THE TERMS AND CONDITIONS OF YOUR SERVICES
              (herein, &ldquo;Producer&rdquo;) AS A CONTRACTING LICENSED, INDEPENDENT PRODUCER FOR
              ESSENTIALS81 CORP D.B.A. ESSENTIAL CARE (herein, &ldquo;Company&rdquo;). IF YOU AGREE
              TO THE TERMS AND CONDITIONS, YOU MUST ENTER YOUR ELECTRONIC SIGNATURE BY ACCEPTING THE
              TERMS OF THE AGREEMENT.</strong>
            </p>
            <p>
              <strong><u>A. Duties and Authority of Producer</u></strong><br/>
              1) Producer shall solicit applications from groups and individuals for insurance products.
              Producer will have the opportunity to select from several insurance products to sell after
              executing this Agreement. Those products and their respective commission schedules will be
              attached to and incorporated into this Agreement. Producer&rsquo;s authority under this
              Agreement is non-exclusive. Producer is an independent contractor of Company, and nothing herein shall be
              construed as creating a relationship of employer-employee, partner, joint ventures, officer or Producer of
              Company in any manner for any other purpose, other than as specifically provided in this Agreement.
            </p>
            <p>
              2) Producer will provide customer service for his or her client as a result of applications submitted by
              Producer (hereinafter referred to as &ldquo;Customer&rdquo; or &ldquo;Customers&rdquo;). Producer must
              follow and understand all enrollment and payment procedures promulgated by insurers of the insurance
              products (hereinafter referred to as &ldquo;Insurer&rdquo; or &ldquo;Insurers&rdquo;) for which Producer
              submits business. Service provided by Producer will include, but not be limited to: a) Acting as liaison
              between the Customer and Insurers; b) Maintaining a working and current knowledge of and ability to
              explain the insurance products; c) Assisting in the enrollment process for all Customers by all available
              means to collect Customer applications; d) Ensuring that all Insurer agreements required for the
              implementation of the insurance products purchased by Customers have been executed; e) Verifying that
              fulfillment materials and policies/certificates have been received by Customers after sale of the
              insurance products; f) Providing sales and customer support to Customers in a timely and satisfactory
              manner; and g) Any other services necessary to fulfill the terms of this Agreement. All services
              identified as items a) through g) above are considered material obligations of Producer, and
              Producer&rsquo;s failure to provide such services shall be considered a material breach of this Agreement.
            </p>
            <p>
              3) Producer agrees to secure and maintain the licenses that are necessary to transact business as a Producer
              on behalf of Insurers and as required by any state or jurisdiction where Producer solicits insurance
              sales. Producer must notify Company immediately of any expiration, termination, suspension or other action
              by a governmental agency affecting Producer&rsquo;s license(s). Producer agrees to notify Company in
              writing immediately upon receiving notice of any misdemeanor (excluding minor traffic offenses) or felony
              charges or any actions including, but not limited to, convictions by any governmental authority for
              commission of any act involving fraud, dishonesty, breach of trust, theft, misappropriation of money or
              breach of any fiduciary duty.
            </p>
            <p>
              4) Producer agrees to comply with the rules, regulations and policies of Company which are included in
              Producer&rsquo;s administrative back office website as may be amended from time to time.
            </p>
            <p>
              5) Producer must use best efforts and practices to ensure that each application is fully and truthfully
              completed by the applicant. Producer must inform the applicant that in no event will the applicant have
              any coverage through an Insurer unless and until the application is reviewed and approved by the Insurer
              and a policy or certificate is issued. Under no circumstances may Producer recommend that a Customer
              cancel any existing coverage until the application is reviewed and approved by the replacement Insurer, if
              applicable.
            </p>
            <p>
              6) Producer is an independent contractor and has no claim to compensation except as
              provided in this Agreement or its addenda and Producer is not entitled to reimbursement from Company for
              any expenses incurred in performing this Agreement. Producer agrees that to the extent of any indebtedness
              to Company from Producer, Company shall have a first lien against any commissions due Producer, and such
              indebtedness may be deducted at the Company&rsquo;s option from any commissions due Producer. This
              Agreement does not give Producer any power of authority other than as expressly granted and no other or
              greater power may be implied from the grant or denial of powers specifically mentioned herein.
            </p>
            <p>
              7) Producer will treat as trade secrets any and all information concerning Company or its business,
              products, techniques, methods, systems, price-books, rating tools, plans or policies. Producer will not,
              during the term of this Agreement or at any time thereafter, disclose such information, in whole or in
              part, to any person, firm or corporation for any reason or purpose whatsoever, or use such information in
              any way or in any capacity other than as Producer of Company in furtherance of Company&rsquo;s interests.
              With respect to information concerning Customers of Company, Producer will implement a comprehensive
              written information security program that includes administrative, technical and physical safeguards for
              the protection of such information that are appropriate to Producer&rsquo;s size, complexity, nature and
              scope of activities and that is designed to a) Ensure the integrity and confidentiality of such
              information; b) Protect against any anticipated threats or hazards to the security or integrity of such
              information; and c) Protect against unauthorized access to, or use of, such information that could result
              in substantial harm or inconvenience to any Customer. Upon termination of this Agreement, or sooner if
              requested by Company, Producer will immediately deliver to Company any and all literature, documents,
              data, information, order forms, memoranda, correspondence, Customer and prospective Customer lists
              (obtained from Company), Customer orders, records, cards or notes acquired, compiled or coming into
              Producer&rsquo;s knowledge, possession, custody or control in connection with his/her activities as
              Producer or sales representative of Company, as well as all machines, parts, equipment, rating tools and
              other materials received by Producer from Company or from any of its Customers, Producers or suppliers in
              connection with such activities.
            </p>
            <p>
              8) With respect to information concerning Customers, Producer
              agrees to a) Ensure that any agent, including a subcontractor, to whom it provides any such information
              received from, or created or received by Producer, agrees to the same restrictions and conditions that
              apply through this Agreement to Producer with respect to such information; and b) In no event, without
              Company&rsquo;s prior written approval, provide such information to any employee of Producer, including a
              subcontractor, if such employee, Producer or subcontractor receives, processes, or otherwise has access to
              such information outside of the United States.
            </p>
            <p>
              9) Producer shall indemnify, defend and hold Company harmless from and against any loss, damage or
              expense, including reasonable attorneys&rsquo; fees, caused by or arising from the negligence, misconduct
              or breach of this Agreement by Producer, including Company&rsquo;s rules, regulations and policies, or
              from the failure of Producer to comply with any federal or state laws, rules or regulations.
            </p>
            <p><strong><u>B. Commissions and Rights Reserved to Company</u></strong><br/>
              1) Commissions. Company will
              pay Producer commissions on the contracts produced by Producer in accordance with the terms set forth in
              product commission schedules for each product Producer selects to offer through Company. Each commission
              schedule executed by the Producer and Company shall become part of this agreement. Subject to Paragraphs 3
              and 4 below, commissions shall be payable to Producer by Company for as long as commissions are collected
              from Insurers for the insurance products sold by Producer.
            </p>
            <p>
              2) Commission Assignment Rights.
              Producer may, with Company&rsquo;s prior written consent, assign commissions payable with respect to
              policies sold by Producer under this Agreement, subject to the following conditions: a) The assignment
              must be in writing, in a form acceptable to Company and irrevocable, and will be honored only when the
              assignee certifies that: (i) the assignor is a true employee of the assignee (or that the assignor is a
              partner of the assignee if the assignee is a partnership); (ii) the assignor is required to assign all
              commissions to the assignee as a condition of employment; and (iii) because of such relationship, it is
              appropriate for Company to report such commissions for tax purposes as income to the assignee. b) The
              terms of the assignment must be determined by Company not to prejudice the interest of Company; and c)
              This Agreement is in force and in good standing at the time of assignment. Any purported assignment or
              transfer of any interest in Producer&rsquo;s commissions other than in strict compliance with this
              Paragraph 2 shall be void as to Company.
            </p>
            <p>
              3) Rights to Commissions on Termination. Unless Company
              terminates this Agreement for cause under Paragraph 3 of Section C, commissions are vested and payable
              after termination of this Agreement until the earlier of a) three years from the date of termination of
              this Agreement, or b) the date on which the monthly compensation amount due is less than $50.
            </p>
            <p>
              4) Loss of Commissions. a) No further commissions shall be payable to Producer should Company terminate
              this Agreement for cause pursuant to Paragraph 3 of Section C. b) If Producer is receiving commissions
              pursuant to post termination rights under Paragraph 3 of Section B, no further commissions shall be
              payable to Producer if (i) Producer shall at any time be indebted to Company for more than sixty (60)
              days; (ii) Producer purports to act, or represents that Producer is entitled to act in any way on behalf
              of Company; (iii) Producer commits any act of fraud or dishonesty or breaches any fiduciary duty or does
              anything which would have been a material default or substantive breach during the period this Agreement
              remained in effect; or (iv) Producer fails to notify Company of any change in Producer&rsquo;s address
              within one (1) year of such change.
            </p>
            <p>
              5) In instances in which Insurers do not pay commissions to
              Producer directly, Company will pay compensation due to Producer under this Agreement within thirty (30)
              days after funds are actually received and recorded by Company from Insurers. Company reserves the right
              to accumulate commissions until commissions due Producer equal at least $100.00. If a debit is owed by
              Producer on business generated by Producer, Company has the right to charge back to Producer, or set-off
              against future commissions due Producer, the amount of commission previously paid to Producer on the
              amount of said debit. Where there is a General Agent with financial responsibility for compensating
              Producer for the sale of any insurance products, Producer agrees to look solely to such General Agent for
              compensation and shall not hold Company responsible for the payment of commissions.
            </p>
            <p>
              6) Licensing
              and Appointment Fees. Producer is responsible for all costs associated with state insurance licensing and
              appointment fees incurred by Insurers. In the event that appointment fees are not collected in advance of
              appointment by an Insurer and not paid by Insurer on behalf of Producer, such appointment fees shall be
              debited from Producer by Company from commissions owed to Producer.
            </p>
            <p>
              7) Errors and Omissions
              Insurance. Producer shall maintain errors and omissions liability insurance at Producer&rsquo;s sole
              expense for as long as the Agreement remains in effect and during any action involving or related to the
              Producer&rsquo;s representation of Insurers that occurred before the Agreement is terminated. The errors
              and omissions liability insurance policy must be issued in Producer&rsquo;s name or as an additionally
              named insured with a minimum requirement of $1,000,000 per occurrence. Producer shall submit evidence of
              errors and omissions coverage to Company upon execution of this Agreement and immediately upon any change
              or replacement of coverage.
            </p>
            <p><strong><u>C. Term and Termination</u></strong><br/>
              1) This Agreement shall be effective for an initial
              term of one (1) year from the Effective Date, and thereafter shall automatically renew for an additional
              term of one (1) year each, unless and until terminated in accordance with the provisions of this
              Agreement.
            </p>
            <p>
              2) This Agreement may be terminated without cause with sixty (60) days written notice
              by either party in a writing executed by a duly authorized representative of the terminating
              party.
            </p>
            <p>
              3) Company may terminate this Agreement immediately upon written notice to Producer at any
              time upon material default or substantive breach by Producer of one or more of its obligations under this
              Agreement (including any amendments), Producer&rsquo;s commission of fraud, dishonesty, breach of trust,
              theft, misappropriation of money, or breach of any fiduciary duty, or Producer&rsquo;s violation of
              Company&rsquo;s rules, regulations and policies as may be amended from time to time. Producer&rsquo;s
              failure to comply with any provision of this Agreement shall be material if Company determines that such
              failure affects Producer&rsquo;s ability to perform under this Agreement. Termination for cause shall not
              be Company&rsquo;s exclusive remedy, but shall be cumulative with all other remedies available at law or
              in equity. A failure to terminate this Agreement for cause shall not be a waiver of the right to do so
              with respect to any past, current or future default.
            </p>
            <p>
              4) This Agreement will automatically
              terminate (i) upon the death of Producer, if Producer is an individual, or (ii) upon the dissolution of
              the corporation or partnership, if Producer is a corporation or partnership.
            </p>
            <p>
              5) Except as
              provided in Paragraph 3 of Section B, all commission payments to Producer under this Agreement shall cease
              upon termination of this Agreement.
            </p>
            <p><strong><u>D. Settlement of Disputes</u></strong><br/>
              1) Producer shall cooperate fully with Company in
              any investigation or proceeding of any regulatory or governmental body, or court of competent
              jurisdiction, including, where required by law, making its books and records available to such entities
              for inspection, if it is determined by Company that the investigation or proceeding affects matters
              covered by, related to, or arising out of this Agreement.
            </p>
            <p>
              2) Producer shall defend any act or
              alleged act of Producer or its employees at its own expense. Producer shall reimburse Company for all
              costs, expenses or legal fees that Company incurs for the defense of any administrative action in which
              Company or Producer is named and which is determined by a court of competent jurisdiction or by an
              appointed arbitrator to be the consequence of any unauthorized act of Producer.
            </p>
            <p>
              3) Mediation and
              Arbitration. If a dispute arises between the parties in connection with this Agreement, Company and
              Producer agree to first submit the dispute to mediation and, if not resolved, to binding arbitration as
              described below. The provisions of this Article shall also apply to disputes, as described herein, between
              Company and Producer and its assigns. a) Mediation. Venue for the mediation shall be Kings County, New
              York and the mediation shall be conducted in Kings County, New York by a mediator chosen from names of
              mediators furnished by the Association of Attorney-Mediators (&ldquo;AAM&rdquo;). If the parties cannot
              agree on a mediator, they will ask AAM to select a mediator not previously chosen by either, and such
              request will be made by both parties after either party, having attempted to agree with the other party
              regarding the selection of a mediator, determines that agreement cannot be obtained in the selection of a
              mediator. The mediation will be non-binding and will be conducted under the rules of mediation then in
              effect in the District Courts of Kings County, New York, and each party will pay one-half of the
              mediator&rsquo;s fees. Each party will bear its own costs. Parties attending and participating in the
              mediation shall have the authority to settle the dispute. b) Arbitration. If the mediation does not result
              in a settlement, the parties agree that the matter shall be settled by binding arbitration in Brooklyn,
              Kings County, New York, administered by the American Arbitration Association (&ldquo;AAA&rdquo;) and
              conducted by a sole arbitrator in accordance with the AAA&rsquo;s Commercial Arbitration Rules
              (&ldquo;Rules&rdquo;). The arbitration shall be governed by the Federal Arbitration Act, 9
              U.S.C. &sect;&sect; 1-16, to the exclusion of state laws inconsistent therewith or that would produce a
              different result, and judgment on the award rendered by the arbitrator may be entered by any court having
              jurisdiction thereof. Except as may be required by law or to the extent necessary in connection with a
              judicial challenge, or enforcement of an award, neither a party nor the arbitrator may disclose the
              existence, content, record or results of an arbitration. Fourteen (14) calendar days before the hearing,
              the parties will exchange and provide to the arbitrator (a) a list of witnesses they intend to call
              (including any experts) with a short description of the anticipated direct testimony of each witness and
              an estimate of the length thereof, and (b) pre-marked copies of all exhibits they intend to use at the
              hearing. Depositions for discovery purposes shall not be permitted. The arbitrator may award only monetary
              relief and is not empowered to award damages other than compensatory damages. Nothing in this section
              eliminates either party&rsquo;s right to terminate this Agreement pursuant to any other provisions in the
              Agreement.
            </p>
            <p><strong><u>E. General Terms</u></strong><br/>
              1) Company and Producer shall comply with all applicable
              state and federal laws and regulations applicable to their businesses, their licenses and the transactions
              into which they enter, including but not limited to the Federal Communications Commission final rule
              amending the Telephone Consumer Protection Act, where Producer engages in outbound telemarketing
              solicitation on behalf of Company.
            </p>
            <p>
              2) Producer shall act in the best interest of Company and
              Insurers. Producer shall not permit other interests, activities or responsibilities to interfere with
              Producer&rsquo;s faithful performance under this Agreement.
            </p>
            <p>
              3) Except as specifically provided in
              Paragraph 2 of Section B, neither this Agreement nor the right to receive money hereunder may be assigned
              without the prior written consent of Company, and any assignment made contrary to this provision shall be
              void as to Company; provided, however, Company may assign, delegate or transfer this Agreement in whole or
              in part to any affiliate, now or in the future, or to any entity which succeeds to the applicable portion
              of its business through a sale, merger or other transaction, provided that such other entity assumes the
              obligations of Company hereunder. This Agreement is personal to Producer, and Producer&rsquo;s duties
              hereunder shall not be delegated or subcontracted by Producer.
            </p>
            <p>
              4) Any notice required from
              Company under this Agreement shall be deemed given on the day such notice is deposited in the United
              States mail with first class postage pre-paid and addressed to Producer at the address of the Producer
              appearing on the records of Company. Any notice required from Producer shall be deemed given on the day
              such notice is deposited in the United States mail with first class postage pre-paid and addressed to
              Company.
            </p>
            <p>
              5) This Agreement (including any amendments, attachments, addenda or schedules) is the
              complete and sole contract between the parties regarding the distribution of Product Offerings by Producer
              subsequent to the Effective Date of this Agreement and supersedes any and all prior understandings or
              agreements between the parties whether oral or in writing on this subject matter.
            </p>
            <p>
              6) In this
              Agreement the words &ldquo;shall&rdquo; and &ldquo;will&rdquo; are used in the mandatory sense. Unless the
              context otherwise clearly requires, any one gender includes all others, the singular includes the plural,
              and the plural includes the singular.
            </p>
            <p>
              7) The fact that Company may not have insisted upon strict
              compliance with this Agreement with respect to an act or transaction of Producer shall not relieve
              Producer from the obligation to perform strictly in accordance with the terms of this Agreement.
            </p>
            <p>
              8)
              Producer covenants and agrees that during the term of this Agreement with the Company and for twelve (12)
              months after the termination thereof, regardless of the reason for the termination, Producer will not,
              directly or indirectly, on Producer&rsquo;s own behalf or on behalf of or in conjunction with any person
              or legal entity, recruit, solicit, or induce, or attempt to recruit, solicit, or induce, any employee of
              the Company to terminate their employment relationship with the Company.
            </p>
            <p>
              9) This Agreement shall
              be governed by the laws of the State of New York.
            </p>
            <p>
              10) Company&rsquo;s liability, if any, for
              damages to Producer for any cause whatsoever arising out of or related to this Agreement, and regardless
              of the form of the action, shall be limited to Producer&rsquo;s actual damages. Company shall not be
              liable for any indirect, incidental, punitive, exemplary, special or consequential damages of any kind
              whatsoever sustained as a result of a breach of this Agreement or any action, inaction or alleged tortuous
              conduct or delay by Company.
            </p>
            <p>
              11) In addition to those provisions which by their terms survive
              expiration or termination of this Agreement, Paragraphs 6, 7 and 8 of Section A, Paragraphs 3 and 4 of
              Section B, Section D, and Paragraphs 3, 9, 10 and 13 of Section E shall survive expiration or termination
              of this Agreement, regardless of the cause giving rise thereto.
            </p>
            <p>
              12) Nothing express or implied in
              this Agreement is intended to confer, nor shall anything herein confer, upon any person other than the
              parties and the respective successors or assigns of the parties, any rights, remedies, obligations or
              liabilities whatsoever.
            </p>
            <p>
              13) Company may modify this Agreement upon thirty (30) days prior written
              notice to Producer. Notwithstanding the foregoing, upon the enactment of any law or regulation, or any
              order or direction of any governmental agency affecting this Agreement, Company may, by written notice to
              Producer, amend the Agreement in such manner as Company determines necessary to comply with such law or
              regulation, or any order or directive of any governmental agency. Company may provide written notice
              pursuant to this paragraph by letter, newsletter, electronic mail or other media.
            </p>
            <p><strong>ACKNOWLEDGMENT</strong><br/>
              Producer has read and fully understands the terms and conditions of this Agreement
              (the &ldquo;Agreement&rdquo;), and its attachments. By signing this Agreement, Producer certifies that Producer has not been convicted of any criminal felony involving dishonesty or breach of
              trust or been convicted of an offense under Section 1033 of the Violent Crime Control and Law Enforcement
              Act of 1994. Producer further agrees to immediately inform the Company of any conviction of the types
              described in the preceding sentence.
            </p>
            <p>The terms of this Essential Care Agent Agreement were first
              published by Agility on June 20, 2025. Any subsequent additions, modifications, deletions or amendments to
              this agreement shall be posted and executed separately.
            </p>
            <p className={'text-danger text-center'}><strong>You have successfully completed this Agreement. No further action is
              required. Thank you!</strong></p>
          </section>
        </div>
      </section>
    </MainLayout>
  );
}
