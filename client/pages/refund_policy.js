'use client'
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { GetTerms } from '../redux/action/apis/terms/getterms';
import Layout from '../components/layout/Layout';
import { useTranslation } from 'react-i18next';

const htmlTerms = `<div>
  <h1>Payment Terms and Conditions</h1>
  <p><strong>Effective Date: May 1, 2025</strong></p>

  <p>These Payment Terms and Conditions ("Terms") govern the payment processes and financial interactions on Duvdu (Main Street Company LLC)—a media-focused freelance marketplace connecting Clients and Freelancers. By using the Platform, you agree to abide by these Terms.</p>

  <h2>1. General Overview</h2>
  <p>1.1 The Platform facilitates the transfer of funds between Clients (buyers of media services) and Freelancers (providers of media services) in exchange for services rendered, including but not limited to photography, videography, animation, editing, graphic design, and audio production.</p>
  <p>1.2 All payments must be made through the Platform. Off-platform payments are strictly prohibited and may result in suspension or termination of your account.</p>

  <h2>2. Escrow System</h2>
  <p>2.1 All projects are subject to an escrow system. Clients must deposit the agreed-upon project amount into escrow before work begins.</p>
  <p>2.2 Funds remain in escrow until the Client approves the completed work.</p>
  <p>2.3 If no approval or dispute is raised within 48 hours after work submission, the funds may be automatically released to the Freelancer.</p>
  <p>2.4 <strong>Dispute Hold and Payment Suspension</strong><br>
  In the event that a Client raises a dispute regarding a project, the payment to the Freelancer will be immediately placed on hold until the issue is investigated and resolved by the Platform. During this period:</p>
  <ul>
    <li>The funds will remain securely in escrow and will not be released to either party until a final decision is made.</li>
    <li>The Platform reserves the right, at its sole discretion and based on the outcome of the investigation, to cancel the pending payment and issue a full or partial refund to the Client.</li>
    <li>The Freelancer acknowledges and agrees that no payout will be made if the Platform determines that the Client’s dispute is valid and warrants a refund.</li>
    <li>Resolution will typically be completed within 7–14 business days, though complex disputes may take longer.</li>
  </ul>

  <h2>3. Service Fees</h2>
  <h3>3.1 Platform Charges and Client-Inclusive Fees</h3>
  <p>The Platform does not charge a service fee on completed transactions from the Freelancer’s earnings. However, the following charges apply to each transaction and are automatically included in the Client’s total payment:</p>
  <ul>
    <li>Value Added Tax (VAT): 14% of the total project amount.</li>
    <li>Transaction Fee: 3% of the total project amount.</li>
    <li>Conflict Handling Fee: 3% of the total project amount.</li>
  </ul>
  <p>Note: These charges are not deducted from the Freelancer’s payout. They are added to the Client’s invoice.</p>

  <h3>3.2 Access Fee After Initial Projects</h3>
  <p>The Platform operates on a “pay-after-you-earn” model:</p>
  <ul>
    <li>Freelancers can complete and receive full payment for their first five (5) projects without any fees.</li>
    <li>After five (5) projects, the Freelancer must pay an Access Fee equal to 10% of earnings from those projects to unlock more bookings.</li>
    <li>Until the Access Fee is paid, the Freelancer profile is visible but not bookable.</li>
  </ul>

  <h2>4. Payment Processing</h2>
  <ul>
    <li>4.1 Clients may fund projects using credit/debit cards.</li>
    <li>4.2 Freelancers will receive payouts via bank transfer or InstaPay.</li>
    <li>4.3 All transactions are in Egyptian Pounds (EGP).</li>
  </ul>

  <h2>5. Dispute Resolution</h2>
  <ul>
    <li>5.1 Clients may raise disputes within 48 hours of delivery.</li>
    <li>5.2 Platform will mediate disputes and may request evidence.</li>
    <li>5.3 Platform decisions are final and binding.</li>
  </ul>

  <h2>6. Refunds</h2>
  <ul>
    <li>6.1 Refunds are issued only if:</li>
    <ul>
      <li>Freelancer fails to deliver,</li>
      <li>Work is unusable and no revisions are made,</li>
      <li>Dispute is resolved in Client’s favor.</li>
    </ul>
    <li>6.2 Disputes must be submitted within 48 hours.</li>
    <li>6.3 Refunds exclude VAT and service fees unless otherwise stated.</li>
  </ul>

  <h2>7. Taxes</h2>
  <p>Egyptian tax laws shall apply, including future amendments.</p>

  <h2>8. Anti-Fraud and Compliance</h2>
  <ul>
    <li>8.1 Funds may be held in cases of suspected fraud or legal requests.</li>
    <li>8.2 Users must comply with local and international regulations.</li>
  </ul>

  <h2>9. Changes to Payment Terms</h2>
  <ul>
    <li>9.1 The Platform may update these Terms at any time.</li>
    <li>9.2 Continued use after updates constitutes acceptance.</li>
  </ul>

  <h2>Contact</h2>
  <p>If you have any questions, please contact us at: <a href="mailto:Omarghobashy@duvdu.com">Omarghobashy@duvdu.com</a></p></div>`






const htmlTermsAR = `<div><h1>شروط وأحكام الدفع</h1>
  <p><strong>تاريخ السريان: 1 مايو 2025</strong></p>

  <p>تحكم هذه الشروط والأحكام الخاصة بالدفع ("الشروط") العمليات المالية والتعاملات المالية على منصة Duvdu (المملوكة لشركة Main Street Company LLC) — وهي سوق حر يركز على الإعلام، يربط بين العملاء والمستقلين. باستخدامك للمنصة، فإنك توافق على الالتزام بهذه الشروط.</p>

  <h2>1. نظرة عامة عامة</h2>
  <p>1.1 تسهل المنصة تحويل الأموال بين العملاء (مشتري خدمات الإعلام) والمستقلين (مقدمي خدمات الإعلام) مقابل الخدمات المقدمة، مثل التصوير الفوتوغرافي، الفيديو، الرسوم المتحركة، المونتاج، التصميم الجرافيكي، وإنتاج الصوت.</p>
  <p>1.2 يجب إجراء جميع المدفوعات من خلال المنصة. يُحظر الدفع خارج المنصة، وقد يؤدي إلى تعليق أو إنهاء الحساب.</p>

  <h2>2. نظام الضمان المالي</h2>
  <p>2.1 يجب إيداع المبلغ في الضمان قبل بدء المشروع.</p>
  <p>2.2 تبقى الأموال محجوزة حتى موافقة العميل.</p>
  <p>2.3 إذا لم يتم الاعتراض خلال 48 ساعة، يتم الإفراج التلقائي عن الأموال.</p>
  <p>2.4 في حالة النزاع، تُعلق المدفوعات ويُحقق فيها خلال 7–14 يوم عمل تقريبًا.</p>

  <h2>3. رسوم الخدمة</h2>
  <h3>3.1 الرسوم المفروضة على العميل</h3>
  <ul>
    <li>ضريبة القيمة المضافة: 14%</li>
    <li>رسوم المعاملة: 3%</li>
    <li>رسوم النزاع: 3%</li>
  </ul>
  <p>ملاحظة: لا تُخصم من أرباح المستقل، بل تُضاف إلى فاتورة العميل.</p>

  <h3>3.2 رسوم الوصول بعد المشاريع الأولى</h3>
  <ul>
    <li>أول 5 مشاريع مجانية من الرسوم</li>
    <li>بعد ذلك يجب دفع 10% من أرباح الخمسة مشاريع لفتح فرص جديدة</li>
    <li>حتى الدفع، يظل الحساب مرئيًا لكن غير قابل للحجز</li>
  </ul>

  <h2>4. معالجة المدفوعات</h2>
  <ul>
    <li>يمكن الدفع ببطاقات الائتمان/الخصم</li>
    <li>المستقلون يستلمون عبر التحويل البنكي أو InstaPay</li>
    <li>العملة: الجنيه المصري (EGP)</li>
  </ul>

  <h2>5. تسوية النزاعات</h2>
  <ul>
    <li>يمكن تقديم نزاع خلال 48 ساعة</li>
    <li>المنصة تتوسط بعدالة وتطلب أدلة عند الحاجة</li>
    <li>قرارات المنصة نهائية وملزمة</li>
  </ul>

  <h2>6. الاسترداد</h2>
  <ul>
    <li>الاسترداد يتم فقط إذا:</li>
    <ul>
      <li>فشل المستقل بالتسليم</li>
      <li>العمل غير صالح والمستقل يرفض التعديلات</li>
      <li>النزاع حُسم لصالح العميل</li>
    </ul>
    <li>يجب تقديم النزاع خلال 48 ساعة</li>
    <li>الاسترداد لا يشمل ضريبة القيمة المضافة والرسوم إلا في حالات استثنائية</li>
  </ul>

  <h2>7. الضرائب</h2>
  <p>تُطبق القوانين الضريبية السارية في جمهورية مصر العربية.</p>

  <h2>8. مكافحة الاحتيال والامتثال</h2>
  <ul>
    <li>قد يتم تعليق الأموال مؤقتًا في حالة النشاط المشبوه أو القانوني</li>
    <li>يجب الالتزام بالقوانين المالية المحلية والدولية</li>
  </ul>

  <h2>9. تعديلات الشروط</h2>
  <ul>
    <li>يحق للمنصة تعديل الشروط في أي وقت</li>
    <li>الاستمرار باستخدام المنصة يعني الموافقة على التعديلات</li>
  </ul>

  <h2>10. معلومات الاتصال</h2>
  <p>للاستفسار: <a href="mailto:Omarghobashy@duvdu.com">Omarghobashy@duvdu.com</a></p></div>`

const RefundPolicy = ({ api, GetTerms , respond }) => {
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
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(RefundPolicy);

