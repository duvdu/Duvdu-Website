'use client'
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { GetTerms } from '../redux/action/apis/terms/getterms';
import Layout from '../components/layout/Layout';
import { useTranslation } from 'react-i18next';

const htmlTerms = `<div><h1>Privacy Policy of Main Street</h1>
  <p><strong>Last updated: May 1, 2025</strong></p>

  <h2>Introduction</h2>
  <p>Main Street Company (“we”, “us”, or “our”) is committed to protecting your personal information. This Privacy Policy describes our policies and procedures regarding the collection, use, and disclosure of your information when you use our website or services (the “Service”). It also outlines your privacy rights and how the law protects you. As a local business operating solely in Egypt, we follow applicable Egyptian privacy laws and general best practices to safeguard your data. By using our Service, you agree to the collection and use of information in accordance with this Privacy Policy.</p>

  <h2>Definitions</h2>
  <ul>
    <li><strong>Account</strong> – a unique account created for You to access our Service or parts of our Service.</li>
    <li><strong>Company</strong> – refers to Main Street Company, New Cairo, Cairo, Egypt.</li>
    <li><strong>Cookies</strong> – small files placed on Your device to store browsing data.</li>
    <li><strong>Country</strong> – refers to Egypt.</li>
    <li><strong>Device</strong> – any device that can access the Service, such as a smartphone or computer.</li>
    <li><strong>Personal Data</strong> – any information that relates to an identified or identifiable individual.</li>
    <li><strong>Service</strong> – refers to the Website and related services, including mobile apps.</li>
    <li><strong>Service Provider</strong> – third-party entities that process data on behalf of the Company.</li>
    <li><strong>Third-Party Social Media Service</strong> – platforms like Facebook or Google used to log into our Service.</li>
    <li><strong>Usage Data</strong> – data collected automatically through usage or infrastructure.</li>
    <li><strong>Website</strong> – <a href="https://duvdu.com/">duvdu.com</a>, <a href="https://mainstreet.company/">mainstreet.company</a>, and official apps.</li>
    <li><strong>You</strong> – the individual or entity accessing the Service.</li>
  </ul>

  <h2>Data Collection and Use</h2>
  <h3>Personal Data</h3>
  <p>We may collect your name, email, phone, address, payment info, identity verification data, etc.</p>

  <h3>Usage Data</h3>
  <p>Includes your IP address, browser type, visited pages, etc.</p>

  <h3>Third-Party Social Media Services</h3>
  <p>If you register via Google, Facebook, or Apple, we may collect associated data.</p>

  <h2>Cookie Policy</h2>
  <p>We use cookies to enhance user experience. You may disable them in your browser, though some features may be affected.</p>

  <h3>Types of Cookies</h3>
  <ul>
    <li>Necessary Cookies</li>
    <li>Cookies Policy / Notice Acceptance</li>
    <li>Functionality Cookies</li>
    <li>Tracking and Performance Cookies</li>
  </ul>

  <h2>Use of Personal Data</h2>
  <ul>
    <li>To provide and maintain the Service</li>
    <li>To manage your Account</li>
    <li>To perform and fulfill contracts</li>
    <li>To contact you</li>
    <li>To send marketing (with consent)</li>
    <li>To manage your requests</li>
    <li>For internal analytics and improvements</li>
  </ul>

  <h2>Sharing of Personal Data</h2>
  <p>We may share data with Service Providers, Business Partners, or with your consent. We do not sell your personal information.</p>

  <h2>Compliance with Laws</h2>
  <p>We may disclose Personal Data to comply with legal obligations or to protect rights, safety, or enforce this policy.</p>

  <h2>Security of Your Personal Data</h2>
  <p>We use reasonable security measures, but no system is 100% secure. Share your data at your own risk.</p>

  <h2>User Rights</h2>
  <ul>
    <li>Access and update your data</li>
    <li>Request deletion</li>
    <li>Withdraw consent</li>
    <li>Opt-out of marketing</li>
  </ul>

  <h2>Children’s Privacy</h2>
  <p>We do not knowingly collect data from children under 13. If done by mistake, we will delete such data promptly.</p>

  <h2>Links to Other Websites</h2>
  <p>Our Service may contain external links. We are not responsible for their privacy policies.</p>

  <h2>Changes to This Privacy Policy</h2>
  <p>We may update this policy. Material changes will be communicated clearly.</p>

  <h2>Legal Liability Disclaimer</h2>
  <p>We limit our liability to the maximum extent permitted by law. If dissatisfied, your remedy is to stop using the Service.</p>

  <h2>Contact Us</h2>
  <p>
    Email: <a href="mailto:info@duvdu.com">info@duvdu.com</a><br>
    Website: <a href="https://duvdu.com/">https://duvdu.com/</a><br>
    Phone: +20 128 222 1544
  </p></div>`






const htmlTermsAR = `<div><h1>سياسة الخصوصية لشركة Main Street</h1>
  <p><strong>آخر تحديث: 1 مايو 2025</strong></p>

  <h2>المقدمة</h2>
  <p>تلتزم شركة Main Street ("نحن"، "لنا" أو "خاصتنا") بحماية معلوماتك الشخصية. تصف سياسة الخصوصية هذه سياساتنا وإجراءاتنا المتعلقة بجمع واستخدام والكشف عن معلوماتك عند استخدامك لموقعنا الإلكتروني أو خدماتنا ("الخدمة"). كما توضح حقوق الخصوصية الخاصة بك وكيفية حماية القانون لها. باستخدامك لخدمتنا، فإنك توافق على جمع واستخدام المعلومات وفقًا لسياسة الخصوصية هذه.</p>

  <h2>التعاريف</h2>
  <ul>
    <li><strong>الحساب:</strong> حساب فريد تم إنشاؤه لك للوصول إلى خدمتنا أو أجزاء منها.</li>
    <li><strong>الشركة:</strong> تشير إلى شركة Main Street، القاهرة الجديدة، القاهرة، مصر.</li>
    <li><strong>ملفات تعريف الارتباط (Cookies):</strong> ملفات صغيرة تُخزن على جهازك لتسجيل تاريخ التصفح.</li>
    <li><strong>البلد:</strong> تشير إلى مصر.</li>
    <li><strong>الجهاز:</strong> أي جهاز يمكنه الوصول إلى الخدمة مثل الهاتف أو الكمبيوتر.</li>
    <li><strong>البيانات الشخصية:</strong> معلومات تتعلق بفرد محدد أو يمكن تحديده.</li>
    <li><strong>الخدمة:</strong> تشير إلى الموقع الإلكتروني وتطبيقات الشركة.</li>
    <li><strong>مزود الخدمة:</strong> جهات خارجية تساعدنا في تقديم الخدمة أو تحليلها.</li>
    <li><strong>خدمة وسائل التواصل الاجتماعي:</strong> مثل فيسبوك أو جوجل المستخدمة لتسجيل الدخول.</li>
    <li><strong>بيانات الاستخدام:</strong> تُجمع تلقائيًا مثل عنوان IP، نوع الجهاز، الصفحات التي تم تصفحها.</li>
    <li><strong>الموقع الإلكتروني:</strong> https://duvdu.com و https://mainstreet.company</li>
    <li><strong>أنت:</strong> المستخدم الذي يستعمل الخدمة أو يمثّل جهة تستخدمها.</li>
  </ul>

  <h2>جمع البيانات واستخدامها</h2>
  <p>قد نقوم بجمع بيانات شخصية مثل الاسم، البريد الإلكتروني، رقم الهاتف، وعنوان السكن، إضافةً إلى معلومات الدفع وتحقق الهوية إذا تطلبت المعاملة.</p>

  <h3>بيانات الاستخدام</h3>
  <p>نقوم بجمع بيانات مثل عنوان IP، نوع الجهاز، الصفحات التي تزورها، وقت الزيارة، وغيرها من البيانات التقنية.</p>

  <h3>المعلومات من وسائل التواصل الاجتماعي</h3>
  <p>يمكنك تسجيل الدخول عبر Google أو Facebook أو Apple، وقد نجمع بيانات مرتبطة بحسابك مثل الاسم والبريد الإلكتروني.</p>

  <h2>سياسة ملفات تعريف الارتباط</h2>
  <p>نستخدم ملفات تعريف الارتباط لتحسين تجربتك. يمكنك تعطيلها من إعدادات المتصفح.</p>

  <h3>أنواع ملفات تعريف الارتباط</h3>
  <ul>
    <li>ملفات ضرورية</li>
    <li>ملفات قبول السياسة</li>
    <li>ملفات الوظائف</li>
    <li>ملفات الأداء والتحليل</li>
  </ul>

  <h2>استخدام البيانات الشخصية</h2>
  <ul>
    <li>لتقديم وصيانة الخدمة</li>
    <li>لإدارة الحساب</li>
    <li>لتنفيذ العقود</li>
    <li>للتواصل معك</li>
    <li>لإرسال محتوى تسويقي (بموافقتك)</li>
    <li>لتحليل وتحسين الخدمة</li>
  </ul>

  <h2>مشاركة البيانات الشخصية</h2>
  <p>لا نقوم ببيع بياناتك. نشاركها فقط مع مزودي الخدمة، الشركاء التجاريين، أو بموافقتك.</p>

  <h2>الامتثال للقوانين</h2>
  <p>قد نكشف بياناتك للسلطات أو لأغراض قانونية عند الحاجة.</p>

  <h2>أمان البيانات</h2>
  <p>نستخدم تدابير معقولة لحماية بياناتك، لكن لا يمكننا ضمان الأمان المطلق.</p>

  <h2>حقوق المستخدم</h2>
  <ul>
    <li>الوصول إلى البيانات وتحديثها</li>
    <li>طلب الحذف</li>
    <li>سحب الموافقة</li>
    <li>الانسحاب من الرسائل التسويقية</li>
  </ul>

  <h2>خصوصية الأطفال</h2>
  <p>لا نجمع بيانات من الأطفال تحت 13 عامًا. إذا حدث ذلك دون قصد، سنقوم بحذف البيانات فورًا.</p>

  <h2>روابط لمواقع أخرى</h2>
  <p>قد يحتوي الموقع على روابط لمواقع خارجية لسنا مسؤولين عنها.</p>

  <h2>تحديثات سياسة الخصوصية</h2>
  <p>قد نقوم بتحديث هذه السياسة وسنقوم بإبلاغك بالتغييرات الجوهرية.</p>

  <h2>إخلاء المسؤولية القانونية</h2>
  <p>الشركة غير مسؤولة عن أي ضرر غير مباشر ناتج عن استخدام الخدمة أو فقدان البيانات.</p>

  <h2>اتصل بنا</h2>
  <p>
    البريد الإلكتروني: <a href="mailto:info@duvdu.com">info@duvdu.com</a><br>
    الموقع الإلكتروني: <a href="https://duvdu.com/">https://duvdu.com</a><br>
    الهاتف: +20 128 222 1544
  </p></div>`

const PrivacyPolicy = ({ api, GetTerms , respond }) => {
    const { i18n } = useTranslation();
    return (

        <Layout>
            <div className='container py-10'>
                <section className='termsBody text-lg font-medium' dangerouslySetInnerHTML={{ __html: i18n.language==='English'?htmlTerms:htmlTermsAR }} />
            </div>
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    api: state.api,
    respond: state.api.GetTerms
});

const mapDispatchToProps = {
    GetTerms
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);

