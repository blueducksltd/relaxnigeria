import React from 'react';
import { Shield, Clock, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

export const metadata = {
  title: "Privacy Policy | RTFIN Enugu Chapter",
  description: "Privacy Policy for Relax Tinubu Is Fixing Nigeria (RTIFN) Enugu Chapter. Understand how we collect, use, and protect your data.",
};

const PrivacyPolicyPage = () => {
  return (
    <main className="w-full bg-[#FBFFDD]/30 min-h-screen">
      {/* Header Banner */}
      <section className="pt-32 md:pt-48 pb-10 md:pb-16 bg-linear-to-br from-darkgreen to-emerald-800 text-white px-6 md:px-20 text-center relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-400/10 blur-3xl rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-400/20 blur-3xl rounded-full" />

        <div className="max-w-3xl mx-auto relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            Official Policy
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-laybar tracking-tight uppercase">Privacy Policy</h1>
          <p className="text-base md:text-xl text-white/80 font-medium">
            Relax Tinubu Is Fixing Nigeria (RTIFN) – Enugu Chapter
          </p>
          <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-white/60 pt-2 font-mono">
            <Clock className="w-4 h-4" />
            <span>Effective Date: June 18, 2026</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-4xl mx-auto px-6 py-12 md:py-24">
        <div className="bg-white rounded-3xl md:rounded-4xl p-6 md:p-16 border border-darkgreen/5 shadow-xl space-y-10 text-darkgreen/90 leading-relaxed text-sm md:text-base">

          {/* Section 1 */}
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-darkgreen flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-darkgreen/10 text-darkgreen text-xs font-bold">1</span>
              Introduction
            </h2>
            <div className="space-y-4 text-darkgreen/80 pl-2">
              <p>
                Relax Tinubu Is Fixing Nigeria (RTIFN) Enugu Chapter (&quot;RTIFN Enugu,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting the privacy and personal information of all members, volunteers, supporters, and visitors who engage with our organization.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, store, protect, and manage your personal information when you apply to join RTIFN Enugu Chapter or interact with our platforms.
              </p>
              <p>
                By submitting your information, you acknowledge that you have read and understood this Privacy Policy and consent to the processing of your personal data as described herein.
              </p>
            </div>
          </div>

          <hr className="border-darkgreen/10" />

          {/* Section 2 */}
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-darkgreen flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-darkgreen/10 text-darkgreen text-xs font-bold">2</span>
              Information We Collect
            </h2>
            <div className="space-y-6 text-darkgreen/80 pl-2">
              {/* Part A */}
              <div className="space-y-2">
                <h3 className="font-bold text-darkgreen">A. Contact Information</h3>
                <p>We may collect:</p>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>Full Name</li>
                  <li>Email Address</li>
                  <li>Phone Number</li>
                </ul>
              </div>

              {/* Part B */}
              <div className="space-y-2">
                <h3 className="font-bold text-darkgreen">B. Voter Verification Information</h3>
                <p>To verify eligibility for membership, we may collect:</p>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>Voter Identification Number (VIN)</li>
                  <li>Full Name as contained on Voter Registration Records</li>
                  <li>Date of Birth</li>
                  <li>State of Registration</li>
                  <li>Local Government Area (LGA)</li>
                  <li>Ward Information</li>
                  <li>Other voter-related information reasonably required for verification</li>
                </ul>
              </div>
            </div>
          </div>

          <hr className="border-darkgreen/10" />

          {/* Section 3 */}
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-darkgreen flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-darkgreen/10 text-darkgreen text-xs font-bold">3</span>
              Purpose of Data Collection
            </h2>
            <div className="space-y-6 text-darkgreen/80 pl-2">
              <p>We collect personal information for the following purposes:</p>

              <div className="space-y-2">
                <h3 className="font-bold text-darkgreen">Contact Information</h3>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>To communicate with members and supporters</li>
                  <li>To send updates, announcements, meeting notices, and organizational information</li>
                  <li>To coordinate activities and community engagement programs</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-darkgreen">Voter Information</h3>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>To verify that an applicant is a registered voter within the Federal Republic of Nigeria</li>
                  <li>To ensure the integrity of RTIFN Enugu membership records</li>
                  <li>To prevent duplicate or fraudulent registrations</li>
                </ul>
              </div>

              <p className="italic text-xs">
                RTIFN Enugu will not use voter information for purposes inconsistent with this Privacy Policy without obtaining additional consent where required.
              </p>
            </div>
          </div>

          <hr className="border-darkgreen/10" />

          {/* Section 4 */}
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-darkgreen flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-darkgreen/10 text-darkgreen text-xs font-bold">4</span>
              Legal Basis for Processing
            </h2>
            <div className="space-y-2 text-darkgreen/80 pl-2">
              <p>We process personal information based on:</p>
              <ul className="list-disc list-inside pl-4 space-y-1">
                <li>The consent provided by individuals during registration;</li>
                <li>Our legitimate interest in maintaining accurate membership records; and</li>
                <li>Compliance with applicable laws and regulations within the Federal Republic of Nigeria.</li>
              </ul>
            </div>
          </div>

          <hr className="border-darkgreen/10" />

          {/* Section 5 */}
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-darkgreen flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-darkgreen/10 text-darkgreen text-xs font-bold">5</span>
              Data Security
            </h2>
            <div className="space-y-4 text-darkgreen/80 pl-2">
              <p>
                RTIFN Enugu implements appropriate administrative, technical, and organizational measures to protect personal information against:
              </p>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 pl-4">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  Unauthorized access
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  Accidental loss
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  Misuse
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  Alteration
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  Disclosure
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  Destruction
                </li>
              </ul>
              <p>
                Access to personal information is restricted to authorized personnel who require such access for official organizational purposes.
              </p>
            </div>
          </div>

          <hr className="border-darkgreen/10" />

          {/* Section 6 */}
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-darkgreen flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-darkgreen/10 text-darkgreen text-xs font-bold">6</span>
              Data Sharing and Disclosure
            </h2>
            <div className="space-y-2 text-darkgreen/80 pl-2">
              <p>
                RTIFN Enugu does not sell, rent, or trade personal information to third parties. Personal information may only be disclosed:
              </p>
              <ul className="list-disc list-inside pl-4 space-y-1">
                <li>Where required by law;</li>
                <li>To regulatory or governmental authorities acting within their lawful powers;</li>
                <li>To authorized service providers assisting RTIFN Enugu in operating its communication systems, subject to confidentiality obligations.</li>
              </ul>
            </div>
          </div>

          <hr className="border-darkgreen/10" />

          {/* Section 7 */}
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-darkgreen flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-darkgreen/10 text-darkgreen text-xs font-bold">7</span>
              Data Retention
            </h2>
            <div className="space-y-3 text-darkgreen/80 pl-2">
              <p>We retain personal information only for as long as necessary to:</p>
              <ul className="list-disc list-inside pl-4 space-y-1">
                <li>Maintain membership records;</li>
                <li>Fulfill the purposes outlined in this Privacy Policy; and</li>
                <li>Comply with applicable legal obligations.</li>
              </ul>
              <p>
                When information is no longer required, it will be securely deleted or anonymized.
              </p>
            </div>
          </div>

          <hr className="border-darkgreen/10" />

          {/* Section 8 */}
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-darkgreen flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-darkgreen/10 text-darkgreen text-xs font-bold">8</span>
              Your Rights
            </h2>
            <div className="space-y-3 text-darkgreen/80 pl-2">
              <p>Subject to applicable law, you may have the right to:</p>
              <ul className="list-disc list-inside pl-4 space-y-1">
                <li>Request access to your personal information;</li>
                <li>Request correction of inaccurate information;</li>
                <li>Request deletion of personal information where appropriate;</li>
                <li>Withdraw consent for future communications;</li>
                <li>Object to certain forms of data processing.</li>
              </ul>
              <p>
                Requests regarding personal data may be submitted through the contact information provided below.
              </p>
            </div>
          </div>

          <hr className="border-darkgreen/10" />

          {/* Section 9 */}
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-darkgreen flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-darkgreen/10 text-darkgreen text-xs font-bold">9</span>
              Cookies and Online Platforms
            </h2>
            <div className="space-y-2 text-darkgreen/80 pl-2">
              <p>
                Where RTIFN Enugu operates websites or digital platforms, basic technical information may be collected to improve functionality, security, and user experience.
              </p>
              <p>Such information may include:</p>
              <ul className="list-disc list-inside pl-4 space-y-1">
                <li>Device information</li>
                <li>Browser type</li>
                <li>IP address</li>
                <li>Usage statistics</li>
              </ul>
            </div>
          </div>

          <hr className="border-darkgreen/10" />

          {/* Section 10 */}
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-darkgreen flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-darkgreen/10 text-darkgreen text-xs font-bold">10</span>
              Changes to This Privacy Policy
            </h2>
            <div className="space-y-2 text-darkgreen/80 pl-2">
              <p>
                RTIFN Enugu reserves the right to update this Privacy Policy from time to time. Any significant changes will be communicated through our official communication channels.
              </p>
            </div>
          </div>

          <hr className="border-darkgreen/10" />

          {/* Section 11 */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-darkgreen flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-darkgreen/10 text-darkgreen text-xs font-bold">11</span>
              Contact Information
            </h2>
            <p className="text-darkgreen/80 pl-2">
              For questions, concerns, or requests regarding this Privacy Policy or the handling of personal information, please contact:
            </p>
            <div className="bg-[#FBFFDD]/50 rounded-2xl p-6 border border-darkgreen/5 space-y-3 font-medium text-darkgreen">
              <p className="font-bold text-lg text-darkgreen">RTIFN Enugu Chapter</p>
              <div className="flex items-center gap-3 text-xs md:text-sm">
                <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>support@relaxnigeria.com</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm">
                <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>+234 704 256 5521</span>
              </div>
              <div className="flex items-center gap-3 text-xs md:text-sm">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Enugu Chapter Secretariat, Enugu, Nigeria</span>
              </div>
            </div>
          </div>

          <hr className="border-darkgreen/10" />

          {/* Consent Statement */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 space-y-3">
            <h3 className="font-bold text-emerald-800 text-lg">Consent Statement</h3>
            <p className="text-emerald-950/80 text-xs md:text-sm leading-relaxed">
              By submitting my registration details to RTIFN Enugu Chapter, I acknowledge that I have read and understood this Privacy Policy and consent to the collection, processing, storage, and use of my personal information for the purposes stated herein.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicyPage;
