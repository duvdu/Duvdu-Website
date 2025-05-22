"use client";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { GetTerms } from "../redux/action/apis/terms/getterms";
import Layout from "../components/layout/Layout";
import { useTranslation } from "react-i18next";

const htmlTerms = `<div>
<p>
    <strong>Privacy Policy of Main Street</strong>
</p>
<p>
    <strong>Introduction</strong>
</p>
<p>
    Main Street Company (“we”, “us”, or “our”) is committed to protecting your
    personal information. This Privacy Policy describes our policies and
    procedures regarding the collection, use, and disclosure of your information
    when you use our website or services (the “Service”). It also outlines your
    privacy rights and how the law protects you. As a local business operating
    solely in Egypt, we follow applicable Egyptian privacy laws and general best
    practices to safeguard your data. By using our Service, you agree to the
    collection and use of information in accordance with this Privacy Policy.
</p>
<p>
    <strong>Definitions</strong>
</p>
<p>
    The following terms have specific meanings in this Privacy Policy. Words
    capitalized in the text (such as “You” or “Company”) are defined as follows
    regardless of whether they appear in singular or plural form:
</p>
<p>
    <strong>Account</strong> – a unique account created for You to access our
    Service or parts of our Service. <br/>
    <strong>Company</strong> (referred to as “the Company”, “We”, “Us” or “Our”
    in this Policy) – refers to Main Street Company, New Cairo, Cairo, Egypt.
    <br/>
    <strong>Cookies</strong> – small files placed on Your computer, mobile
    device, or any other device by a website, containing details of Your
    browsing history on that website among other uses. <br/>
    <strong>Country</strong> – refers to Egypt. <br/>
    <strong>Device</strong> – any device that can access the Service, such as a
    computer, smartphone, or tablet. <br/>
    <strong>Personal Data</strong> – any information that relates to an
    identified or identifiable individual. <br/>
    <strong>Service</strong> – refers to the Website (and any related services)
    operated by the Company, including our mobile applications available on the
    Google Play Store and Apple App Store. <br/>
    <strong>Service Provider</strong> – any natural or legal person who
    processes data on behalf of the Company. This includes third-party companies
    or individuals employed by the Company to facilitate the Service, provide
    the Service on the Company’s behalf, perform services related to the
    Service, or assist the Company in analyzing how the Service is used. <br/>
    <strong>Third-Party Social Media Service</strong> – any website or social
    network platform through which a User can log in or create an account to use
    the Service. <br/>
    <strong>Usage Data</strong> – data collected automatically, generated either
    by the use of the Service or from the Service infrastructure itself (for
    example, the duration of a page visit). <br/>
    <strong>Website</strong> – refers to the Main Street Company website,
    accessible at https://duvdu.com/ and https://mainstreet.company/, as well as
    our official mobile applications available at:
</p>
<ul>
    <li>
        Google Play Store:
        https://play.google.com/store/apps/details?id=com.duvdu.duvdu_app&amp;pcampaignid=web_share
    </li>
    <li>
        Apple App Store: Available under the name “Duvdu”
        (https://apps.apple.com/eg/app/duvdu/id6743176883  ) <br/>
        <strong>You</strong> – the individual accessing or using the Service, or
        the company or other legal entity on behalf of which such individual is
        accessing or using the Service.
    </li>
</ul>
<p>
    <strong>Data Collection and Use</strong>
</p>
<p>
    We collect several types of information for various purposes to provide and
    improve our Service to you.
</p>
<p>
    <strong>Personal Data</strong>
</p>
<p>
    While using our Service, we may ask You to provide certain personally
    identifiable information that can be used to contact or identify You. This
    Personal Data may include, but is not limited to:
</p>
<p>
    <strong>Contact Information:</strong> such as your email address, first name
    and last name, phone number, and postal address (governorate/state,
    province, ZIP/postal code, city).
</p>
<p>
    <strong>Payment Information:</strong> if you make purchases through the
    Service, we may collect payment details (for example, your bank account
    information or other payment credentials) in order to process transactions
    for products or services. Note: We do not store credit/debit card numbers on
    our servers; payment information is handled by trusted third-party payment
    processors (see the Payments section below).
</p>
<p>
    <strong>Identity Verification Data:</strong> If You pay for a product or
    service via bank transfer or other non-automated methods, we may request
    additional information to facilitate the transaction and verify your
    identity. Such information may include your date of birth, national
    identification number or passport details, a copy of a bank statement,
    and/or proof of address.
</p>
<p>
    We only collect Personal Data that you voluntarily provide to us or that is
    necessary to deliver the Service you have requested. You may choose not to
    provide certain information, but then you might not be able to take
    advantage of some of our Service features.
</p>
<p>
    <strong>Usage Data</strong>
</p>
<p>
    Usage Data is collected automatically when you interact with our Service.
    This information can include details such as your device’s Internet Protocol
    address (IP address), browser type, browser version, the specific pages of
    our Website that you visit, the date and time of your visit, and the time
    spent on those pages. It may also include unique device identifiers and
    other diagnostic data. If you access the Service through a mobile device, we
    may collect additional information, for example: the type of mobile device
    you use, your device’s unique ID or identifier, the IP address of your
    mobile device, your mobile operating system, the type of mobile Internet
    browser used, and other diagnostic data. We may also collect information
    that your browser sends whenever you visit our Website or when you access
    the Service through a mobile device.
</p>
<p>
    <strong>Information from Third-Party Social Media Services</strong>
</p>
<p>
    You have the option to create an account or log in to our Service using your
    accounts on Third-Party Social Media Services. The Company currently allows
    login/registration through the following services:
</p>
<p>
    Google
</p>
<p>
    Facebook
</p>
<p>
    Apple
</p>
<p>
    If You decide to register through or otherwise grant us access to a
    Third-Party Social Media Service, we may collect Personal Data that is
    associated with your account on that service. This may include information
    such as your name and email address, and any other information you have made
    available via your social media account. You may also have the option of
    sharing additional information with us through your social media profile
    (such as a profile picture or other details). If You choose to provide such
    information, you are giving us permission to collect, use, and store it in
    accordance with this Privacy Policy.
</p>
<p>
    <strong>Cookie Policy</strong>
</p>
<p>
    We use Cookies and similar tracking technologies to track activity on our
    Website and store certain information. These technologies help us improve
    your experience and analyze the use of our Service. By using our Service,
    you consent to our use of cookies and similar technologies as described in
    this section. Tracking Technologies Used: The tracking technologies we
    utilize may include:
</p>
<p>
    <strong>Browser Cookies:</strong> A cookie is a small file placed on Your
    Device. You can instruct your browser to refuse all cookies or to alert you
    when a cookie is being sent. However, if You do not accept cookies, you may
    not be able to use some parts of our Service. Unless you have adjusted your
    browser settings to refuse cookies, our Service may use cookies as described
    here.
</p>
<p>
    <strong>Flash Cookies:</strong> Certain features of our Service may use
    local stored objects (also known as Flash cookies) to collect and store
    information about your preferences or your activity on our Website. Flash
    cookies are not managed by the same browser settings that control browser
    cookies. If you wish to manage or disable Flash cookies, you may need to do
    so through your Adobe Flash Player settings or relevant software.
</p>
<p>
    <strong>Web Beacons:</strong> Some pages of our Service and our emails may
    contain small electronic files known as web beacons (also called clear GIFs,
    pixel tags, or single-pixel GIFs). These web beacons allow the Company, for
    example, to count users who have visited those pages or opened an email, or
    to gather other related statistics (e.g., recording the popularity of
    certain website content and verifying system and server integrity).
</p>
<p>
    <strong>Types of Cookies We Use:</strong> We use both session cookies (which
    are temporary and deleted when you close your browser) and persistent
    cookies (which remain on your device for a set period or until you delete
    them) for the purposes outlined below:
</p>
<p>
    <strong>Necessary/Essential Cookies:</strong> (Session cookies, administered
    by us) – These cookies are essential to provide you with services available
    through the Website and to enable you to use certain features. They help
    authenticate users and prevent fraudulent use of accounts. Without these
    cookies, some services on the Website cannot be provided. We only use these
    cookies to deliver the requested services to you.
</p>
<p>
    <strong>Cookies Policy / Notice Acceptance Cookies:</strong> (Persistent
    cookies, administered by us) – These cookies identify whether users have
    accepted our use of cookies on the Website (e.g., to remember if you’ve
    already seen and acknowledged the cookie consent banner).
</p>
<p>
    <strong>Functionality Cookies:</strong> (Persistent cookies, administered by
    us) – These cookies allow us to remember choices you make when you use the
    Website, such as remembering your login details or language preference. The
    purpose of these cookies is to provide you with a more personal and
    convenient experience and to avoid you having to re-enter your preferences
    each time you use the Website.
</p>
<p>
    <strong>Tracking and Performance Cookies:</strong> (Persistent cookies,
    administered by third parties) – These cookies are used to track information
    about traffic to the Website and how users interact with the Website. The
    information collected via these cookies may directly or indirectly identify
    individual visitors via a pseudonymous identifier. For example, they may be
    used to analyze website usage, visit counts, or to test new features and see
    how users react to changes. These cookies may be set by third-party
    analytics services on our behalf (see the Analytics section below for
    examples). They help us understand how visitors use our site and improve the
    Website’s performance and your user experience.
</p>
<p>
    <strong>You have choices regarding cookies.</strong> You can typically set
    your browser to refuse some or all cookies, or to prompt you before
    accepting them. However, if you disable or decline cookies, some features of
    our Service may be inaccessible or not function properly.
</p>
<p>
    <strong>Use of Personal Data</strong>
</p>
<p>
    The Company may use your Personal Data for the following purposes:
</p>
<p>
    To provide and maintain our Service: We use your information to deliver the
    services you have requested, to process transactions, and to allow you to
    use features of our Website. We also monitor usage of our Service and keep
    it running securely and efficiently.
</p>
<p>
    To manage your Account: Your information is used to register you as a user
    and manage your account on our Service. Personal Data you provide helps
    administer account access and functionality available to you as a registered
    user.
</p>
<p>
    To perform and fulfill contracts: When you enter into a purchase or service
    agreement with us (for example, buying a product or service through the
    Website), we process your Personal Data to carry out our obligations and
    provide you with the purchased product or service, as well as to manage
    payments and delivery.
</p>
<p>
    To contact you: We may use your contact information (email address, phone
    number, SMS) to send you account confirmations, notifications, updates, or
    informative communications related to the Service. We might also contact you
    to inform you about changes to our Service, security updates, or to respond
    to inquiries you send us.
</p>
<p>
    To send you marketing and promotional content: With your consent or as
    otherwise permitted by law, we may use your information to provide you with
    news, special offers, and general information about goods, services, and
    events that we offer. These communications will be similar to those that you
    have already purchased or inquired about, unless you have opted not to
    receive such marketing materials.
</p>
<p>
    To manage your requests: We use Personal Data to address and manage any
    inquiries, requests, complaints, or support needs you have communicated to
    us.
</p>
<p>
    For other business purposes: We may use your information for internal
    purposes such as data analysis, research, and to improve our products,
    services, marketing efforts, and overall user experience. For example, we
    might analyze usage trends to enhance the Service’s performance or
    effectiveness.
</p>
<p>
    We will only use your Personal Data for the purposes for which we have
    collected it, and will not use it in a way that is incompatible with those
    purposes without your consent or unless required by law.
</p>
<p>
    <strong>Sharing of Personal Data</strong>
</p>
<p>
    We do not sell your personal information. However, we may share or disclose
    your Personal Data in the following situations, and only as described below:
</p>
<p>
    With Service Providers: We may share your Personal Data with third-party
    service providers who perform services on our behalf. These services
    include, for example, website hosting, data analysis, payment processing,
    information technology provision, customer service, email delivery, and
    other support services. We only provide these partners with the data they
    need to perform their specific function, and we contractually require them
    to protect your information and use it only for the purposes of providing
    services to us.
</p>
<p>
    With Business Partners: We might share your information with our business
    partners or collaborators to offer you certain products, services, or
    promotions. For instance, if we partner with another local business for a
    joint promotion or a bundled offering, we may share relevant information
    with that partner as necessary. These partners are also expected to adhere
    to privacy obligations regarding your data.
</p>
<p>
    With Your Consent: We will disclose your personal information to third
    parties for purposes other than those listed above only if you have given us
    consent to do so. For example, if you agree to let us share your testimony
    or feedback with the public, or if you authorize us to share your details
    with another company for their own marketing, we will do so only with your
    explicit consent.
</p>
<p>
    Aside from the situations listed above, we will not share your Personal Data
    with any third party unless it is required or permitted by law (as described
    in the next section). We do not disclose your information to outside parties
    for their direct marketing purposes without your authorization.
</p>
<p>
    <strong>Compliance with Laws and Legal Requirements</strong>
</p>
<p>
    The Company may disclose your Personal Data in good faith when such action
    is necessary to comply with legal obligations or protect legitimate
    interests, as follows:
</p>
<p>
    Law Enforcement: Under certain circumstances, we may be required to disclose
    your Personal Data if compelled to do so by law or in response to valid
    requests by public authorities (for example, a court order, subpoena, or
    government request). We will only provide the information that we are
    legally required to disclose.
</p>
<p>
    Other Legal Requirements: We may also disclose your Personal Data in the
    good faith belief that such action is necessary to:
</p>
<p>
    Comply with a legal obligation or applicable law
</p>
<p>
    Protect and defend the rights or property of the Company
</p>
<p>
    Prevent or investigate possible wrongdoing in connection with the Service
</p>
<p>
    Protect the personal safety of users of the Service or the public
</p>
<p>
    Protect against legal liability (for example, enforcing this Privacy Policy
    or defending against legal claims)
</p>
<p>
    <strong>Security of Your Personal Data</strong>
</p>
<p>
    The security of Your Personal Data is important to us. We implement
    commercially reasonable security measures to protect your information from
    unauthorized access, disclosure, alteration, or destruction. However, please
    be aware that no method of transmission over the internet or method of
    electronic storage is 100% secure. While we strive to use acceptable means
    to protect Your Personal Data, we cannot guarantee its absolute security.
    You share and provide your information at your own risk, and we cannot
    promise that information will remain perfectly secure in all circumstances.
</p>
<p>
    <strong>User Rights</strong>
</p>
<p>
    We respect your rights to your personal information. As a user of our
    Service, and in accordance with applicable law, you are entitled to the
    following rights:
</p>
<p>
    Access and Update: You have the right to request information about the
    Personal Data we hold about you and to receive a copy of it. You may also
    ask us to correct or update your Personal Data if it is inaccurate or
    incomplete.
</p>
<p>
    Deletion (Right to Erasure): You can request that we delete your Personal
    Data when it is no longer necessary for the purposes it was collected. We
    will also delete your Personal Data if you withdraw consent (when consent
    was the legal basis for processing) or if deletion is required to comply
    with a legal obligation. Please note that we might retain certain
    information as required by law or for legitimate business purposes (e.g.,
    completing a transaction you initiated, or for record-keeping and fraud
    prevention).
</p>
<p>
    Withdraw Consent: Where we rely on your consent to process personal
    information, you have the right to withdraw that consent at any time.
    Withdrawing consent will not affect the lawfulness of any processing we
    conducted prior to your withdrawal, and it may not affect processing of your
    data under other valid legal grounds.
</p>
<p>
    Opt-Out of Marketing Communications: You have the right to opt out of
    receiving promotional or marketing communications from us. If you no longer
    wish to receive such communications, you can follow the “unsubscribe”
    instructions included in those emails or contact us to be removed from our
    marketing list. (Please note that even if you opt out of marketing messages,
    we may still send you transactional or administrative notifications related
    to the Service, such as order confirmations, security alerts, or account
    notifications.)
</p>
<p>
    To exercise any of these rights, please contact us using the contact
    information provided in the Contact Us section below. We may ask you to
    verify your identity before responding to certain requests. We will consider
    and respond to your request within a reasonable timeframe, and in any event
    within any timeframe required by applicable law.
</p>
<p>
    <strong>Children’s Privacy</strong>
</p>
<p>
    Our Service is not directed to anyone under the age of 13, and we do not
    knowingly collect personally identifiable information from children under 13
    years old. If you are under 13, please do not use the Service or submit any
    Personal Data to us. If you are a parent or guardian and you become aware
    that your child has provided us with Personal Data, please contact us. We
    take children’s privacy seriously. If we discover that we have collected
    Personal Data from anyone under the age of 13 without verified parental
    consent, we will promptly take steps to remove that information from our
    servers. If we rely on consent as a legal basis for processing your
    information and your country or local law requires consent from a parent or
    guardian for individuals under a certain age, we will require parental
    consent before we collect or use that information from a minor.
</p>
<p>
    <strong>Links to Other Websites</strong>
</p>
<p>
    Our Service may contain links to other websites that are not operated by us.
    If You click on a third-party link, you will be directed to that third
    party’s site. We strongly advise You to review the Privacy Policy of every
    site you visit, as their privacy practices may differ from ours. We have no
    control over, and assume no responsibility for, the content, privacy
    policies, or practices of any third-party websites or services. This Privacy
    Policy applies solely to information collected by our Website or in the
    context of our Service.
</p>
<p>
    <strong>Changes to this Privacy Policy</strong>
</p>
<p>
    We may update Our Privacy Policy from time to time. We will notify you of
    any significant changes by posting the new Privacy Policy on this page. If
    the changes are material, we will provide a prominent notice (for example,
    via a banner on our site or an email notification) to inform you of updates,
    prior to the change becoming effective. We will also update the “Last
    updated” date at the top of this Privacy Policy to indicate when the latest
    changes were made. We encourage you to review this Privacy Policy
    periodically for any updates. Any changes to this Privacy Policy are
    effective once they are posted on this page. Your continued use of the
    Service after we post changes to this Policy will signify your
    acknowledgment of the modifications and your consent to abide by the updated
    terms.
</p>
<p>
    <strong>Legal Liability Disclaimer</strong>
</p>
<p>
    To the fullest extent permitted by applicable law, Main Street Company shall
    not be liable for any indirect, incidental, special, consequential, or
    punitive damages arising out of or relating to your use of the Service, your
    reliance on this Privacy Policy, or any handling of your Personal Data
    (including any unauthorized access or misuse of your data that is beyond our
    reasonable control). We provide the Service and handle Personal Data with
    reasonable care and security, but you agree that the Company’s total
    liability for any claims, losses, or damages in connection with this Privacy
    Policy shall be limited to the maximum extent permitted by law. In other
    words, our legal responsibility to you is restricted as much as the law
    allows. By using the Service, you acknowledge and agree that the Company is
    not responsible for any unauthorized access to or alteration of your
    transmissions or data, any material or data sent or received or not sent or
    received, or any transactions entered into through our Service. If you are
    dissatisfied with the Service or any of the terms in this Privacy Policy,
    your sole remedy is to discontinue use of the Service.
</p>
<p>
    <strong>Contact Us</strong>
</p>
<p>
    If you have any questions, concerns, or requests regarding this Privacy
    Policy or your personal data, you can contact us through any of the
    following methods:
</p>
<p>
    By email: info@duvdu.com
</p>
<p>
    Online: By visiting let’s connect page on our website at https://duvdu.com/
</p>
<p>
    By phone: +20 128 222 1544
</p>
<p>
    We will be happy to assist you and address any issues you may have.
</p>
  </div>`;

const htmlTermsAR = `<div>
<p dir="RTL">
    <strong>سياسة الخصوصية لشركة</strong> <strong>Main Street</strong> <br/>
</p>
<p dir="RTL">
    <strong>المقدمة</strong>
</p>
<p dir="RTL">
    تلتزم شركة Main Street ("نحن"، "لنا" أو "خاصتنا") بحماية معلوماتك الشخصية.
    تصف سياسة الخصوصية هذه سياساتنا وإجراءاتنا المتعلقة بجمع واستخدام والكشف عن
    معلوماتك عند استخدامك لموقعنا الإلكتروني أو خدماتنا ("الخدمة"). كما توضح
    حقوق الخصوصية الخاصة بك وكيفية حماية القانون لها. بصفتنا شركة محلية تعمل فقط
    في مصر، نتبع قوانين الخصوصية المصرية المعمول بها وأفضل الممارسات العامة
    لحماية بياناتك. باستخدامك لخدمتنا، فإنك توافق على جمع واستخدام المعلومات
    وفقًا لسياسة الخصوصية هذه.
</p>
<p dir="RTL">
    <strong>التعاريف</strong>
</p>
<p dir="RTL">
    المصطلحات التالية لها معانٍ محددة في سياسة الخصوصية هذه. الكلمات المكتوبة
    بحروف كبيرة في النص (مثل "أنت" أو "الشركة") تُعرّف على النحو التالي بغض
    النظر عما إذا كانت بصيغة المفرد أو الجمع:
</p>
<ul type="disc">
    <li dir="RTL">
        <strong>الحساب</strong> – حساب فريد تم إنشاؤه لك للوصول إلى خدمتنا أو
        أجزاء منها.
    </li>
    <li dir="RTL">
        <strong>الشركة</strong> (يُشار إليها بـ "الشركة"، "نحن"، "لنا" أو
        "خاصتنا" في هذه السياسة) – تشير إلى شركة Main Street، القاهرة الجديدة،
        القاهرة، مصر.
    </li>
    <li dir="RTL">
        <strong>ملفات تعريف الارتباط</strong> <strong>(Cookies)</strong> – ملفات
        صغيرة توضع على جهاز الكمبيوتر أو الجهاز المحمول أو أي جهاز آخر خاص بك
        بواسطة موقع إلكتروني، تحتوي على تفاصيل سجل التصفح الخاص بك على ذلك
        الموقع من بين استخدامات أخرى.
    </li>
    <li dir="RTL">
        <strong>البلد</strong> – تشير إلى مصر.
    </li>
    <li dir="RTL">
        <strong>الجهاز</strong> – أي جهاز يمكنه الوصول إلى الخدمة، مثل الكمبيوتر
        أو الهاتف الذكي أو الجهاز اللوحي.
    </li>
    <li dir="RTL">
        <strong>البيانات الشخصية</strong> – أي معلومات تتعلق بفرد محدد أو يمكن
        تحديده.
    </li>
    <li dir="RTL">
        <strong>الخدمة</strong> – تشير إلى الموقع الإلكتروني (وأي خدمات ذات صلة)
        التي تديرها الشركة، بما في ذلك تطبيقاتنا المحمولة المتاحة على متجر
        Google Play ومتجر Apple App Store.
    </li>
    <li dir="RTL">
        <strong>مزود الخدمة</strong> – أي شخص طبيعي أو اعتباري يعالج البيانات
        نيابة عن الشركة. يشمل ذلك الشركات أو الأفراد من الجهات الخارجية الذين
        توظفهم الشركة لتسهيل الخدمة، أو تقديم الخدمة نيابة عن الشركة، أو أداء
        خدمات متعلقة بالخدمة، أو مساعدة الشركة في تحليل كيفية استخدام الخدمة.
    </li>
    <li dir="RTL">
        <strong>خدمة وسائل التواصل الاجتماعي التابعة لجهات خارجية</strong> – أي
        موقع إلكتروني أو منصة شبكة اجتماعية يمكن للمستخدم من خلالها تسجيل الدخول
        أو إنشاء حساب لاستخدام الخدمة.
    </li>
    <li dir="RTL">
        <strong>بيانات الاستخدام</strong> – البيانات التي يتم جمعها تلقائيًا،
        والتي يتم إنشاؤها إما عن طريق استخدام الخدمة أو من البنية التحتية للخدمة
        نفسها (على سبيل المثال، مدة زيارة الصفحة).
    </li>
    <li dir="RTL">
        <strong>الموقع الإلكتروني</strong> – يشير إلى موقع شركة Main Street،
        المتاح على
        <a href="https://duvdu.com/" target="_new">
            https://duvdu.com/
        </a>
        و https://mainstreet.company/، بالإضافة إلى تطبيقاتنا الرسمية المتاحة
        على:
    </li>
    <ul type="circle">
        <li dir="RTL">
            متجر Google Play:
            <a
                href="https://play.google.com/store/apps/details?id=com.duvdu.duvdu_app&amp;pcampaignid=web_share"
                target="_new"
            >
                https://play.google.com/store/apps/details?id=com.duvdu.duvdu_app&amp;pcampaignid=web_share
            </a>
        </li>
        <li dir="RTL">
            متجر Apple App Store: متاح تحت اسم "Duvdu"
            (<a href="https://apps.apple.com/eg/app/duvdu/id6743176883" target="_new">https://apps.apple.com/eg/app/duvdu/id6743176883</a>)
        </li>
    </ul>
    <li dir="RTL">
        <strong>أنت</strong> – الفرد الذي يصل إلى الخدمة أو يستخدمها، أو الشركة
        أو الكيان القانوني الآخر الذي يصل إلى الخدمة أو يستخدمها نيابة عن هذا
        الفرد.
    </li>
</ul>
<p dir="RTL">
    <strong>جمع البيانات واستخدامها</strong>
</p>
<p dir="RTL">
    <strong>البيانات الشخصية</strong>
</p>
<p dir="RTL">
    أثناء استخدامك لخدمتنا، قد نطلب منك تقديم معلومات تعريف شخصية معينة يمكن
    استخدامها للاتصال بك أو تحديد هويتك. قد تشمل هذه البيانات الشخصية، على سبيل
    المثال لا الحصر:
</p>
<ul type="disc">
    <li dir="RTL">
        <strong>معلومات الاتصال</strong>: مثل عنوان بريدك الإلكتروني، الاسم
        الأول واسم العائلة، رقم الهاتف، والعنوان البريدي (المحافظة/الولاية،
        المقاطعة، الرمز البريدي/الرمز البريدي، المدينة).
    </li>
    <li dir="RTL">
        <strong>معلومات الدفع</strong>: إذا قمت بإجراء عمليات شراء من خلال
        الخدمة، فقد نجمع تفاصيل الدفع (على سبيل المثال، معلومات حسابك المصرفي أو
        بيانات اعتماد الدفع الأخرى) لمعالجة المعاملات الخاصة بالمنتجات أو
        الخدمات. ملاحظة: نحن لا نخزن أرقام بطاقات الائتمان/الخصم على خوادمنا؛
        تتم معالجة معلومات الدفع بواسطة معالجات الدفع الموثوقة من الجهات
        الخارجية (انظر قسم المدفوعات أدناه).
    </li>
    <li dir="RTL">
        <strong>بيانات التحقق من الهوية</strong>: إذا قمت بالدفع مقابل منتج أو
        خدمة عبر التحويل المصرفي أو طرق غير آلية أخرى، فقد نطلب معلومات إضافية
        لتسهيل المعاملة والتحقق من هويتك. قد تشمل هذه المعلومات تاريخ ميلادك،
        رقم الهوية الوطنية أو تفاصيل جواز السفر، نسخة من كشف الحساب المصرفي،
        و/أو إثبات العنوان.
    </li>
</ul>
<p dir="RTL">
    نحن نجمع فقط البيانات الشخصية التي تقدمها لنا طوعًا أو التي تكون ضرورية
    لتقديم الخدمة التي طلبتها. يمكنك اختيار عدم تقديم معلومات معينة، ولكن قد لا
    تتمكن من الاستفادة من بعض ميزات خدمتنا.
</p>
<p dir="RTL">
    <strong>بيانات الاستخدام</strong>
</p>
<p dir="RTL">
    يتم جمع بيانات الاستخدام تلقائيًا عند تفاعلك مع خدمتنا. قد تشمل هذه
    المعلومات تفاصيل مثل عنوان بروتوكول الإنترنت (IP) الخاص بجهازك، نوع المتصفح،
    إصدار المتصفح، الصفحات المحددة لموقعنا الإلكتروني التي تزورها، تاريخ ووقت
    زيارتك، والوقت الذي تقضيه على تلك الصفحات. قد تشمل أيضًا معرفات الجهاز
    الفريدة وبيانات تشخيصية أخرى. إذا قمت بالوصول إلى الخدمة من خلال جهاز محمول،
    فقد نجمع معلومات إضافية، على سبيل المثال: نوع الجهاز المحمول الذي تستخدمه،
    معرف جهازك الفريد أو المعرف، عنوان IP لجهازك المحمول، نظام التشغيل المحمول
    الخاص بك، نوع متصفح الإنترنت المحمول المستخدم، وبيانات تشخيصية أخرى. قد نجمع
    أيضًا معلومات يرسلها متصفحك كلما زرت موقعنا الإلكتروني أو عندما تصل إلى
    الخدمة من خلال جهاز محمول.
</p>
<p dir="RTL">
    <strong>
        المعلومات من خدمات وسائل التواصل الاجتماعي التابعة لجهات خارجية
    </strong>
</p>
<p dir="RTL">
    لديك خيار إنشاء حساب أو تسجيل الدخول إلى خدمتنا باستخدام حساباتك على خدمات
    وسائل التواصل الاجتماعي التابعة لجهات خارجية. تسمح الشركة حاليًا بتسجيل
    الدخول/التسجيل من خلال الخدمات التالية:
</p>
<ul type="disc">
    <li dir="RTL">
        Google
    </li>
    <li dir="RTL">
        Facebook
    </li>
    <li dir="RTL">
        Apple
    </li>
</ul>
<p dir="RTL">
    إذا قررت التسجيل من خلال أو منحنا الوصول إلى خدمة وسائل التواصل الاجتماعي
    التابعة لجهة خارجية، فقد نجمع البيانات الشخصية المرتبطة بحسابك على تلك
    الخدمة. قد تشمل هذه المعلومات اسمك وعنوان بريدك الإلكتروني، وأي معلومات أخرى
    جعلتها متاحة عبر حسابك على وسائل التواصل الاجتماعي. قد يكون لديك أيضًا خيار
    مشاركة معلومات إضافية معنا من خلال ملفك الشخصي على وسائل التواصل الاجتماعي
    (مثل صورة الملف الشخصي أو تفاصيل أخرى). إذا اخترت تقديم هذه المعلومات، فإنك
    تمنحنا الإذن بجمعها واستخدامها وتخزينها وفقًا لسياسة الخصوصية هذه.
</p>
<p dir="RTL">
    <strong>سياسة ملفات تعريف الارتباط</strong>
</p>
<p dir="RTL">
    نستخدم ملفات تعريف الارتباط وتقنيات تتبع مشابهة لتتبع النشاط على موقعنا
    الإلكتروني وتخزين معلومات معينة. تساعدنا هذه التقنيات في تحسين تجربتك وتحليل
    استخدام خدمتنا. باستخدامك لخدمتنا، فإنك توافق على استخدامنا لملفات تعريف
    الارتباط والتقنيات المشابهة كما هو موضح في هذا القسم.
</p>
<p dir="RTL">
    <strong>تقنيات التتبع المستخدمة</strong> <strong>:</strong>
</p>
<ul type="disc">
    <li dir="RTL">
        <strong>ملفات تعريف الارتباط الخاصة بالمتصفح</strong>: ملف تعريف
        الارتباط هو ملف صغير يوضع على جهازك. يمكنك توجيه متصفحك لرفض جميع ملفات
        تعريف الارتباط أو لتنبيهك عند إرسال ملف تعريف ارتباط. ومع ذلك، إذا لم
        تقبل ملفات تعريف الارتباط، فقد لا تتمكن من استخدام بعض أجزاء خدمتنا. ما
        لم تقم بتعديل إعدادات المتصفح لرفض ملفات تعريف الارتباط، قد تستخدم
        خدمتنا ملفات تعريف الارتباط كما هو موضح هنا.
    </li>
    <li dir="RTL">
        <strong>ملفات تعريف الارتباط الفلاش</strong>: قد تستخدم بعض ميزات خدمتنا
        كائنات مخزنة محليًا (المعروفة أيضًا باسم ملفات تعريف الارتباط الفلاش)
        لجمع وتخزين معلومات حول تفضيلاتك أو نشاطك على موقعنا الإلكتروني. لا تتم
        إدارة ملفات تعريف الارتباط الفلاش من خلال نفس إعدادات المتصفح التي تتحكم
        في ملفات تعريف الارتباط الخاصة بالمتصفح. إذا كنت ترغب في إدارة أو تعطيل
        ملفات تعريف الارتباط الفلاش، فقد تحتاج إلى القيام بذلك من خلال إعدادات
        Adobe Flash Player أو البرنامج ذي الصلة.
    </li>
    <li dir="RTL">
        <strong>إشارات الويب</strong>: قد تحتوي بعض صفحات خدمتنا ورسائل البريد
        الإلكتروني الخاصة بنا على ملفات إلكترونية صغيرة تُعرف باسم إشارات الويب
        (تُعرف أيضًا باسم صور GIF الواضحة أو علامات البكسل أو صور GIF ذات البكسل
        الواحد). تسمح إشارات الويب للشركة، على سبيل المثال، بعدد المستخدمين
        الذين زاروا تلك الصفحات أو فتحوا بريدًا إلكترونيًا، أو جمع إحصاءات أخرى
        ذات صلة (على سبيل المثال، تسجيل شعبية محتوى موقع معين والتحقق من سلامة
        النظام والخادم).
    </li>
</ul>
<p dir="RTL">
    <strong>أنواع ملفات تعريف الارتباط التي نستخدمها</strong> <strong>:</strong>
</p>
<ul type="disc">
    <li dir="RTL">
        <strong>ملفات تعريف الارتباط الضرورية/الأساسية</strong>: (ملفات تعريف
        الارتباط للجلسة، تُدار بواسطة الشركة) – هذه الملفات ضرورية لتوفير
        الخدمات المتاحة من خلال الموقع الإلكتروني وتمكينك من استخدام بعض ميزاته.
        تساعد في مصادقة المستخدمين ومنع الاستخدام الاحتيالي للحسابات. بدون هذه
        الملفات، لا يمكن توفير بعض الخدمات على الموقع الإلكتروني. نستخدم هذه
        الملفات فقط لتقديم الخدمات المطلوبة لك.
    </li>
    <li dir="RTL">
        <strong>
            ملفات تعريف الارتباط الخاصة بسياسة ملفات تعريف الارتباط/إشعار القبول
        </strong>
        : (ملفات تعريف الارتباط الدائمة، تُدار بواسطة الشركة) – تحدد هذه الملفات
        ما إذا كان المستخدمون قد قبلوا استخدامنا لملفات تعريف الارتباط على
        الموقع الإلكتروني (على سبيل المثال، لتذكر ما إذا كنت قد رأيت بالفعل
        ووافقت على لافتة موافقة ملفات تعريف الارتباط).
    </li>
    <li dir="RTL">
        <strong>ملفات تعريف الارتباط الخاصة بالوظائف</strong>: (ملفات تعريف
        الارتباط الدائمة، تُدار بواسطة الشركة) – تتيح لنا هذه الملفات تذكر
        الاختيارات التي تقوم بها عند استخدام الموقع الإلكتروني، مثل تذكر تفاصيل
        تسجيل الدخول أو تفضيل اللغة. الغرض من هذه الملفات هو توفير تجربة أكثر
        تخصيصًا وملاءمة لك وتجنب الحاجة إلى إعادة إدخال تفضيلاتك في كل مرة
        تستخدم فيها الموقع الإلكتروني.
    </li>
</ul>
<p dir="RTL">
    • <strong>ملفات تعريف الارتباط الخاصة بالتتبع والأداء</strong>: (ملفات تعريف
    الارتباط الدائمة، تُدار بواسطة جهات خارجية) – تُستخدم هذه الملفات لتتبع
    المعلومات حول حركة المرور إلى الموقع الإلكتروني وكيفية تفاعل المستخدمين مع
    الموقع. قد تحدد المعلومات التي يتم جمعها من خلال هذه الملفات الزوار الأفراد
    بشكل مباشر أو غير مباشر من خلال معرّف مستعار. على سبيل المثال، قد تُستخدم
    لتحليل استخدام الموقع الإلكتروني، عدد الزيارات، أو لاختبار ميزات جديدة
    ومعرفة كيفية تفاعل المستخدمين مع التغييرات. قد يتم تعيين هذه الملفات من قبل
    خدمات تحليل تابعة لجهات خارجية نيابةً عنا (انظر قسم التحليلات أدناه للحصول
    على أمثلة). إنها تساعدنا في فهم كيفية استخدام الزوار لموقعنا وتحسين أداء
    الموقع وتجربة المستخدم الخاصة بك.
</p>
<p dir="RTL">
    <strong>استخدام البيانات الشخصية</strong>
</p>
<p dir="RTL">
    قد تستخدم الشركة بياناتك الشخصية للأغراض التالية:
</p>
<ul type="disc">
    <li dir="RTL">
        <strong>لتقديم وصيانة خدمتنا</strong>: نستخدم معلوماتك لتقديم الخدمات
        التي طلبتها، ومعالجة المعاملات، والسماح لك باستخدام ميزات موقعنا
        الإلكتروني. كما نراقب استخدام الخدمة ونحافظ على تشغيلها بأمان وكفاءة.
    </li>
    <li dir="RTL">
        <strong>لإدارة حسابك</strong>: تُستخدم معلوماتك لتسجيلك كمستخدم وإدارة
        حسابك على خدمتنا. تساعد البيانات الشخصية التي تقدمها في إدارة الوصول إلى
        الحساب والوظائف المتاحة لك كمستخدم مسجل.
    </li>
    <li dir="RTL">
        <strong>لتنفيذ العقود والوفاء بها</strong>: عندما تدخل في اتفاقية شراء
        أو خدمة معنا (على سبيل المثال، شراء منتج أو خدمة من خلال الموقع
        الإلكتروني)، نقوم بمعالجة بياناتك الشخصية للوفاء بالتزاماتنا وتقديم
        المنتج أو الخدمة المشتراة، بالإضافة إلى إدارة المدفوعات والتسليم.
    </li>
    <li dir="RTL">
        <strong>للتواصل معك</strong>: قد نستخدم معلومات الاتصال الخاصة بك (عنوان
        البريد الإلكتروني، رقم الهاتف، الرسائل النصية القصيرة) لإرسال تأكيدات
        الحساب، الإشعارات، التحديثات، أو الاتصالات الإعلامية المتعلقة بالخدمة.
        قد نتواصل معك أيضًا لإبلاغك بالتغييرات في خدمتنا، تحديثات الأمان، أو
        للرد على الاستفسارات التي ترسلها إلينا.
    </li>
    <li dir="RTL">
        <strong>لإرسال محتوى تسويقي وترويجي</strong>: بموافقتك أو كما يسمح به
        القانون، قد نستخدم معلوماتك لتزويدك بالأخبار، العروض الخاصة، والمعلومات
        العامة حول السلع، الخدمات، والفعاليات التي نقدمها. ستكون هذه الاتصالات
        مشابهة لتلك التي قمت بشرائها أو الاستفسار عنها بالفعل، ما لم تكن قد
        اخترت عدم تلقي مثل هذه المواد التسويقية.
    </li>
    <li dir="RTL">
        <strong>لإدارة طلباتك</strong>: نستخدم البيانات الشخصية لمعالجة وإدارة
        أي استفسارات، طلبات، شكاوى، أو احتياجات دعم قمت بالتواصل معنا بشأنها.
    </li>
    <li dir="RTL">
        <strong>لأغراض تجارية أخرى</strong>: قد نستخدم معلوماتك لأغراض داخلية
        مثل تحليل البيانات، البحث، وتحسين منتجاتنا، خدماتنا، جهودنا التسويقية،
        وتجربة المستخدم العامة. على سبيل المثال، قد نقوم بتحليل اتجاهات
        الاستخدام لتعزيز أداء الخدمة أو فعاليتها.
    </li>
</ul>
<p dir="RTL">
    سنستخدم بياناتك الشخصية فقط للأغراض التي جمعناها من أجلها، ولن نستخدمها
    بطريقة غير متوافقة مع تلك الأغراض دون موافقتك أو ما لم يطلبه القانون.
</p>
<div align="center" dir="RTL">
    <hr
    size="2" width="100%" align="center" />
</div>
<p dir="RTL">
    <strong>مشاركة البيانات الشخصية</strong>
</p>
<p dir="RTL">
    نحن لا نبيع معلوماتك الشخصية. ومع ذلك، قد نشارك أو نكشف عن بياناتك الشخصية
    في الحالات التالية، وفقط كما هو موضح أدناه:
</p>
<ul type="disc">
    <li dir="RTL">
        <strong>مع مزودي الخدمة</strong>: قد نشارك بياناتك الشخصية مع مزودي
        الخدمة من الجهات الخارجية الذين يؤدون خدمات نيابة عنا. تشمل هذه الخدمات،
        على سبيل المثال، استضافة الموقع الإلكتروني، تحليل البيانات، معالجة
        المدفوعات، توفير تكنولوجيا المعلومات، خدمة العملاء، تسليم البريد
        الإلكتروني، وخدمات الدعم الأخرى. نحن نقدم لهؤلاء الشركاء فقط البيانات
        التي يحتاجونها لأداء وظيفتهم المحددة، ونطلب منهم تعاقديًا حماية معلوماتك
        واستخدامها فقط لأغراض تقديم الخدمات لنا.
    </li>
    <li dir="RTL">
        <strong>مع الشركاء التجاريين</strong>: قد نشارك معلوماتك مع شركائنا
        التجاريين أو المتعاونين لتقديم بعض المنتجات، الخدمات، أو العروض
        الترويجية لك. على سبيل المثال، إذا تعاونّا مع شركة محلية أخرى في عرض
        ترويجي مشترك أو عرض مجمع، فقد نشارك المعلومات ذات الصلة مع ذلك الشريك
        حسب الحاجة. من المتوقع أيضًا أن يلتزم هؤلاء الشركاء بالتزامات الخصوصية
        المتعلقة ببياناتك.
    </li>
    <li dir="RTL">
        <strong>بموافقتك</strong>: سنكشف عن معلوماتك الشخصية لأطراف ثالثة لأغراض
        غير تلك المذكورة أعلاه فقط إذا كنت قد منحتنا موافقتك على ذلك. على سبيل
        المثال، إذا وافقت على السماح لنا بمشاركة شهادتك أو ملاحظاتك مع الجمهور،
        أو إذا منحتنا الإذن بمشاركة تفاصيلك مع شركة أخرى لأغراضها التسويقية
        الخاصة، فسنقوم بذلك فقط بموافقتك الصريحة.
    </li>
</ul>
<p dir="RTL">
    بخلاف الحالات المذكورة أعلاه، لن نشارك بياناتك الشخصية مع أي طرف ثالث ما لم
    يكن ذلك مطلوبًا أو مسموحًا به بموجب القانون (كما هو موضح في القسم التالي).
    نحن لا نكشف عن معلوماتك لأطراف خارجية لأغراض التسويق المباشر الخاصة بهم دون
    إذنك.
</p>
<div align="center" dir="RTL">
    <hr
    size="2" width="100%" align="center" />
</div>
<p dir="RTL">
    <strong>الامتثال للقوانين والمتطلبات القانونية</strong>
</p>
<p dir="RTL">
    قد تكشف الشركة عن بياناتك الشخصية بحسن نية عندما يكون هذا الإجراء ضروريًا
    للامتثال للالتزامات القانونية أو لحماية المصالح المشروعة، كما يلي:
</p>
<ul type="disc">
    <li dir="RTL">
        <strong>إنفاذ القانون</strong>: في ظل ظروف معينة، قد يُطلب منا الكشف عن
        بياناتك الشخصية إذا تم إجبارنا على ذلك بموجب القانون أو استجابة لطلبات
        صالحة من السلطات العامة (على سبيل المثال، أمر محكمة، استدعاء، أو طلب
        حكومي). سنقدم فقط المعلومات التي يُطلب منا قانونًا الكشف عنها.
    </li>
    <li dir="RTL">
        <strong>متطلبات قانونية أخرى</strong>: قد نكشف أيضًا عن بياناتك الشخصية
        بحسن نية عندما يكون هذا الإجراء ضروريًا لـ:
    </li>
    <ul type="circle">
        <li dir="RTL">
            الامتثال لالتزام قانوني أو قانون معمول به
        </li>
        <li dir="RTL">
            حماية والدفاع عن حقوق أو ممتلكات الشركة
        </li>
        <li dir="RTL">
            منع أو التحقيق في أي مخالفات محتملة فيما يتعلق بالخدمة
        </li>
        <li dir="RTL">
            حماية السلامة الشخصية لمستخدمي الخدمة أو الجمهور
        </li>
        <li dir="RTL">
            الحماية من المسؤولية القانونية (على سبيل المثال، تنفيذ سياسة
            الخصوصية هذه أو الدفاع ضد المطالبات القانونية)
        </li>
    </ul>
</ul>
<div align="center" dir="RTL">
    <hr
    size="2" width="100%" align="center" />
</div>
<p dir="RTL">
    <strong>أمان بياناتك الشخصية</strong>
</p>
<p dir="RTL">
    أمان بياناتك الشخصية مهم بالنسبة لنا. نحن ننفذ تدابير أمان معقولة تجاريًا
    لحماية معلوماتك من الوصول غير المصرح به أو الكشف أو التغيير أو التدمير. ومع
    ذلك، يرجى العلم بأنه لا توجد طريقة لنقل البيانات عبر الإنترنت أو طريقة
    لتخزين إلكتروني آمنة بنسبة 100%. بينما نسعى لاستخدام وسائل مقبولة لحماية
    بياناتك الشخصية، لا يمكننا ضمان أمانها المطلق. أنت تشارك وتقدم معلوماتك على
    مسؤوليتك الخاصة، ولا يمكننا أن نعد بأن تظل المعلومات آمنة تمامًا في جميع
    الظروف.
</p>
<div align="center" dir="RTL">
    <hr
    size="2" width="100%" align="center" />
</div>
<p dir="RTL">
    <strong>حقوق المستخدم</strong>
</p>
<p dir="RTL">
    نحن نحترم حقوقك فيما يتعلق بمعلوماتك الشخصية. بصفتك مستخدمًا لخدمتنا، ووفقًا
    للقانون المعمول به، يحق لك ما يلي:
</p>
<ul type="disc">
    <li dir="RTL">
        <strong>الوصول والتحديث</strong>: لديك الحق في طلب معلومات حول البيانات
        الشخصية التي نحتفظ بها عنك والحصول على نسخة منها. يمكنك أيضًا أن تطلب
        منا تصحيح أو تحديث بياناتك الشخصية إذا كانت غير دقيقة أو غير كاملة.
    </li>
    <li dir="RTL">
        <strong>الحذف (الحق في المحو)</strong>: يمكنك طلب حذف بياناتك الشخصية
        عندما لم تعد ضرورية للأغراض التي تم جمعها من أجلها. سنقوم أيضًا بحذف
        بياناتك الشخصية إذا سحبت موافقتك (عندما كانت الموافقة هي الأساس القانوني
        للمعالجة) أو إذا كان الحذف مطلوبًا للامتثال لالتزام قانوني. يرجى ملاحظة
        أننا قد نحتفظ بمعلومات معينة كما هو مطلوب بموجب القانون أو لأغراض تجارية
        مشروعة (على سبيل المثال، إكمال معاملة بدأت بها، أو لأغراض حفظ السجلات
        ومنع الاحتيال).
    </li>
    <li dir="RTL">
        <strong>سحب الموافقة</strong>: عندما نعتمد على موافقتك لمعالجة المعلومات
        الشخصية، يحق لك سحب تلك الموافقة في أي وقت. لن يؤثر سحب الموافقة على
        قانونية أي معالجة قمنا بها قبل سحبك، وقد لا يؤثر على معالجة بياناتك
        بموجب أسس قانونية أخرى صالحة.
    </li>
    <li dir="RTL">
        <strong>الانسحاب من الاتصالات التسويقية</strong>: لديك الحق في الانسحاب
        من تلقي الاتصالات الترويجية أو التسويقية منا. إذا لم تعد ترغب في تلقي
        مثل هذه الاتصالات، يمكنك اتباع تعليمات "إلغاء الاشتراك" المضمنة في تلك
        الرسائل الإلكترونية أو الاتصال بنا لإزالتك من قائمتنا التسويقية. (يرجى
        ملاحظة أنه حتى إذا انسحبت من الرسائل التسويقية، قد نواصل إرسال إشعارات
        المعاملات أو الإشعارات الإدارية المتعلقة بالخدمة، مثل تأكيدات الطلبات،
        تنبيهات الأمان، أو إشعارات الحساب).
    </li>
</ul>
<p dir="RTL">
    لممارسة أي من هذه الحقوق، يرجى الاتصال بنا باستخدام معلومات الاتصال المقدمة
    في قسم "اتصل بنا" أدناه. قد نطلب منك التحقق من هويتك قبل الرد على طلبات
    معينة. سننظر في طلبك ونرد عليه في إطار زمني معقول، وفي أي حال ضمن أي إطار
    زمني مطلوب بموجب القانون المعمول به.
</p>
<div align="center" dir="RTL">
    <hr
    size="2" width="100%" align="center" />
</div>
<p dir="RTL">
    <strong>خصوصية الأطفال</strong>
</p>
<p dir="RTL">
    خدمتنا غير موجهة لأي شخص يقل عمره عن 13 عامًا، ونحن لا نجمع عن علم معلومات
    تعريف شخصية من الأطفال دون سن 13 عامًا. إذا كنت تحت سن 13، يرجى عدم استخدام
    الخدمة أو تقديم أي بيانات شخصية لنا. إذا كنت أحد الوالدين أو الأوصياء وأصبحت
    على علم بأن طفلك قد قدم لنا بيانات شخصية، يرجى الاتصال بنا. نحن نأخذ خصوصية
    الأطفال على محمل الجد. إذا اكتشفنا أننا جمعنا بيانات شخصية من أي شخص دون سن
    13 دون موافقة الوالدين المُحققة، سنتخذ خطوات فورية لإزالة تلك المعلومات من
    خوادمنا. إذا كنا نعتمد على الموافقة كأساس قانوني لمعالجة معلوماتك وكان بلدك
    أو قانونك المحلي يتطلب موافقة الوالدين للأفراد دون سن معينة، سنطلب موافقة
    الوالدين قبل أن نجمع أو نستخدم تلك المعلومات من القاصر.
</p>
<div align="center" dir="RTL">
    <hr
    size="2" width="100%" align="center" />
</div>
<p dir="RTL">
    <strong>روابط لمواقع إلكترونية أخرى</strong>
</p>
<p dir="RTL">
    قد تحتوي خدمتنا على روابط لمواقع إلكترونية أخرى لا نديرها. إذا نقرت على رابط
    طرف ثالث، سيتم توجيهك إلى موقع ذلك الطرف الثالث. نوصيك بشدة بمراجعة سياسة
    الخصوصية لكل موقع تزوره، حيث قد تختلف ممارسات الخصوصية الخاصة بهم عن
    ممارساتنا. ليس لدينا سيطرة على، ولا نتحمل أي مسؤولية عن، محتوى أو سياسات
    الخصوصية أو ممارسات أي مواقع إلكترونية أو خدمات تابعة لأطراف ثالثة. تنطبق
    سياسة الخصوصية هذه فقط على المعلومات التي تم جمعها من خلال موقعنا الإلكتروني
    أو في سياق خدمتنا.
</p>
<div align="center" dir="RTL">
    <hr
    size="2" width="100%" align="center" />
</div>
<p dir="RTL">
    <strong>التغييرات في سياسة الخصوصية هذه</strong>
</p>
<p dir="RTL">
    قد نقوم بتحديث سياسة الخصوصية الخاصة بنا من وقت لآخر. سنخطرك بأي تغييرات
    مهمة عن طريق نشر سياسة الخصوصية الجديدة على هذه الصفحة. إذا كانت التغييرات
    جوهرية، سنقدم إشعارًا بارزًا (على سبيل المثال، عبر لافتة على موقعنا أو إشعار
    عبر البريد الإلكتروني لإبلاغك بالتحديثات، قبل أن تصبح التغييرات سارية
    المفعول. سنقوم أيضًا بتحديث تاريخ "آخر تحديث" في أعلى سياسة الخصوصية للإشارة
    إلى موعد إجراء آخر التعديلات. نشجعك على مراجعة سياسة الخصوصية هذه بشكل دوري
    للاطلاع على أي تحديثات. تصبح أي تغييرات على سياسة الخصوصية هذه سارية المفعول
    بمجرد نشرها على هذه الصفحة. إن استمرارك في استخدام الخدمة بعد نشرنا لتعديلات
    على هذه السياسة يعني أنك تقر بهذه التعديلات وتوافق على الالتزام ببنودها
    المعدلة.
</p>
<div align="center" dir="RTL">
    <hr
    size="2" width="100%" align="center" />
</div>
<p dir="RTL">
    <strong>إخلاء المسؤولية القانونية</strong>
</p>
<p dir="RTL">
    إلى أقصى حد يسمح به القانون المعمول به، لا تتحمل شركة Main Street أي مسؤولية
    عن أي أضرار غير مباشرة، عرضية، خاصة، تبعية، أو تأديبية ناتجة عن أو متعلقة
    باستخدامك للخدمة، أو اعتمادك على سياسة الخصوصية هذه، أو أي معالجة لبياناتك
    الشخصية (بما في ذلك أي وصول غير مصرح به أو سوء استخدام لبياناتك يتجاوز
    سيطرتنا المعقولة). نحن نقدم الخدمة ونتعامل مع البيانات الشخصية بعناية وأمان
    معقولين، ولكنك توافق على أن مسؤولية الشركة الكاملة تجاه أي مطالبات أو خسائر
    أو أضرار تتعلق بسياسة الخصوصية هذه تكون محدودة إلى أقصى حد يسمح به القانون.
    بعبارة أخرى، إن مسؤوليتنا القانونية تجاهك مقيدة بقدر ما يسمح به القانون.
    باستخدامك للخدمة، فإنك تقر وتوافق على أن الشركة ليست مسؤولة عن أي وصول غير
    مصرح به إلى أو تعديل لبياناتك أو نقلاتك، أو أي مواد أو بيانات تم إرسالها أو
    استلامها أو لم يتم إرسالها أو استلامها، أو أي معاملات دخلت فيها من خلال
    خدمتنا. إذا كنت غير راضٍ عن الخدمة أو أي من الشروط الواردة في سياسة الخصوصية
    هذه، فإن الحل الوحيد المتاح لك هو التوقف عن استخدام الخدمة.
</p>
<div align="center" dir="RTL">
    <hr
    size="2" width="100%" align="center" />
</div>
<p dir="RTL">
    <strong>اتصل بنا</strong>
</p>
<p dir="RTL">
    إذا كانت لديك أي أسئلة أو مخاوف أو طلبات تتعلق بسياسة الخصوصية هذه أو
    ببياناتك الشخصية، يمكنك الاتصال بنا من خلال أي من الطرق التالية:
</p>
<ul type="disc">
    <li dir="RTL">
        <strong>عبر البريد الإلكتروني</strong>: info@duvdu.com
    </li>
    <li dir="RTL">
        <strong>عبر الإنترنت</strong>: من خلال زيارة صفحة "لنتواصل" على موقعنا
        على الإنترنت:
        <a href="https://duvdu.com/" target="_new">
            https://duvdu.com/
        </a>
    </li>
    <li dir="RTL">
        <strong>عبر الهاتف</strong>: +20 128 222 1544
    </li>
</ul>
<p dir="RTL">
    سيسعدنا مساعدتك.
</p>
</div>`;

const PrivacyPolicy = ({ api, GetTerms, respond }) => {
  const { i18n } = useTranslation();
  return (
    <Layout>
      <div className="container py-10">
        <section
          className="termsBody text-lg font-medium"
          dangerouslySetInnerHTML={{
            __html: i18n.language === "English" ? htmlTerms : htmlTermsAR,
          }}
        />
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  api: state.api,
  respond: state.api.GetTerms,
});

const mapDispatchToProps = {
  GetTerms,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);
