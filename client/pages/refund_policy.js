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
  <p>If you have any questions, please contact us at: <a href="mailto:info@duvdu.com">info@duvdu.com</a></p></div>`






const htmlTermsAR = `<div>
<p><strong>شروط</strong><strong>&nbsp;</strong><strong>وأحكام</strong><strong>&nbsp;</strong><strong>الدفع</strong></p>
<p><strong>تاريخ السريان: 1 مايو 2025</strong></p>
<p>تحكم هذه الشروط والأحكام الخاصة بالدفع (&quot;الشروط&quot;) العمليات المالية والتعاملات المالية على منصة Duvdu (المملوكة لشركة Main Street Company LLC) &mdash; وهي سوق حر يركز على الإعلام، يربط بين العملاء والمستقلين. باستخدامك للمنصة، فإنك توافق على الالتزام بهذه الشروط.</p>
<p><br></p>
<p><strong>1.&nbsp;</strong><strong>نظرة</strong><strong>&nbsp;</strong><strong>عامة</strong><strong>&nbsp;</strong><strong>عامة</strong></p>
<p>1.1 تسهل المنصة تحويل الأموال بين العملاء (مشتري خدمات الإعلام) والمستقلين (مقدمي خدمات الإعلام) مقابل الخدمات المقدمة، بما في ذلك، على سبيل المثال لا الحصر، التصوير الفوتوغرافي، تصوير الفيديو، الرسوم المتحركة، المونتاج، التصميم الجرافيكي، وإنتاج الصوت.</p>
<p>1.2 يجب إجراء جميع المدفوعات من خلال المنصة. يُحظر تمامًا الدفع خارج المنصة، وقد يؤدي ذلك إلى تعليق أو إنهاء حسابك.</p>
<p><br></p>
<p><strong>2.&nbsp;</strong><strong>نظام</strong><strong>&nbsp;</strong><strong>الضمان</strong><strong>&nbsp;</strong><strong>المالي</strong><strong>&nbsp;(Escrow)</strong></p>
<p>2.1 تخضع جميع المشاريع لنظام ضمان مالي. يجب على العميل إيداع المبلغ المتفق عليه في حساب الضمان قبل بدء العمل.</p>
<p>2.2 تظل الأموال في حساب الضمان حتى يوافق العميل على العمل المنجز.</p>
<p>2.3 إذا لم يتم تقديم الموافقة أو رفع نزاع خلال 48 ساعة من تسليم العمل، فقد يتم تحرير الأموال تلقائيًا للمستقل.</p>
<p>2.4 <strong>تعليق</strong><strong>&nbsp;</strong><strong>الدفع</strong><strong>&nbsp;</strong><strong>في</strong><strong>&nbsp;</strong><strong>حال</strong><strong>&nbsp;</strong><strong>وجود</strong><strong>&nbsp;</strong><strong>نزاع</strong><br>إذا رفع العميل نزاعًا بخصوص مشروع معين، فسيتم تعليق الدفع للمستقل على الفور حتى يتم التحقيق وحل المشكلة من قبل المنصة. خلال هذه الفترة:</p>
<ul>
    <li>ستظل الأموال آمنة في حساب الضمان ولن يتم تحريرها لأي من الطرفين حتى يتم اتخاذ قرار نهائي.</li>
    <li>تحتفظ المنصة بالحق، وفقًا لتقديرها الخاص واستنادًا إلى نتيجة التحقيق، في إلغاء الدفع المعلق وإصدار رد كامل أو جزئي للعميل.</li>
    <li>يقر المستقل ويوافق على أنه لن يتم صرف أي مدفوعات إذا قررت المنصة أن النزاع المقدم من العميل مبرر ويستحق الاسترداد.</li>
    <li>يتم عادة حل النزاع خلال 7 إلى 14 يوم عمل، إلا أن النزاعات المعقدة قد تستغرق وقتًا أطول.</li>
</ul>
<p>تهدف هذه السياسة إلى حماية نزاهة المعاملات وضمان العدالة للطرفين، العملاء والمستقلين.</p>
<p><br></p>
<p><br></p>
<p><strong>3.&nbsp;</strong><strong>رسوم</strong><strong>&nbsp;</strong><strong>الخدمة</strong></p>
<p>3.1 <strong>الرسوم</strong><strong>&nbsp;</strong><strong>المفروضة</strong><strong>&nbsp;</strong><strong>ورسوم</strong><strong>&nbsp;</strong><strong>شاملة</strong><strong>&nbsp;</strong><strong>للعميل</strong><br>لا تفرض المنصة رسوم خدمة على المعاملات المكتملة من أرباح المستقل. ومع ذلك، يتم تطبيق الرسوم التالية على كل معاملة وتُدرج تلقائيًا في إجمالي دفع العميل كجزء من الإيصال الشامل:</p>
<ul>
    <li>ضريبة القيمة المضافة (VAT): 14% من إجمالي مبلغ المشروع.</li>
    <li>رسوم المعاملة: 3% من إجمالي مبلغ المشروع لتغطية تكاليف معالجة الدفع والتحويلات المصرفية والضرائب العامة المبسطة.</li>
    <li>رسوم معالجة النزاعات: 3% من إجمالي مبلغ المشروع لدعم تسوية النزاعات وضمان الجودة وسلامة المنصة.</li>
</ul>
<p><strong>ملاحظة</strong><strong>:</strong> لا تُخصم هذه الرسوم من مدفوعات المستقل. النظام يضيفها تلقائيًا إلى فاتورة العميل، مما يضمن حصول المستقل على كامل المبلغ المتفق عليه.</p>
<p>3.2 <strong>رسوم</strong><strong>&nbsp;</strong><strong>الوصول</strong><strong>&nbsp;</strong><strong>بعد</strong><strong>&nbsp;</strong><strong>المشاريع</strong><strong>&nbsp;</strong><strong>الأولية</strong><br>تعتمد المنصة على نموذج &quot;ادفع بعد أن تربح&quot; بدلاً من فرض عمولات مقدمة أو اشتراكات مستمرة. وتحديدًا:</p>
<ul>
    <li>يمكن للمستقلين إكمال واستلام المدفوعات الكاملة لأول خمس (5) مشاريع على المنصة دون أي رسوم.</li>
    <li>بعد تسليم واستلام الدفع بنجاح لخمس (5) مشاريع، يجب على المستقل دفع رسوم وصول تعادل 10% من إجمالي أرباح تلك المشاريع الخمسة.</li>
    <li>يجب دفع هذه الرسوم لفتح فرص الحجز الخمس (5) التالية (العملاء المحتملين).</li>
    <li>حتى يتم دفع رسوم الوصول، سيظل ملف المستقل مرئيًا ولكن غير متاح لحجوزات جديدة.</li>
    <li>يتيح هذا النموذج للمستقلين تحقيق دخل أولًا والدفع لاحقًا، مما يدعم بيئة منخفضة المخاطر ومحفزة على الأداء.</li>
</ul>
<p><br></p>
<p><strong>4.&nbsp;</strong><strong>معالجة</strong><strong>&nbsp;</strong><strong>المدفوعات</strong></p>
<p>4.1 يمكن للعملاء تمويل المشاريع باستخدام بطاقات الائتمان/الخصم.</p>
<p>4.2 سيتلقى المستقلون مدفوعاتهم من خلال طرق السحب المختارة، بما في ذلك التحويل البنكي وInstaPay.</p>
<p>4.3 تتم جميع المعاملات بالجنيه المصري (EGP).</p>
<p><br></p>
<p><strong>5.&nbsp;</strong><strong>تسوية</strong><strong>&nbsp;</strong><strong>النزاعات</strong></p>
<p>5.1 إذا لم يرض العميل عن جودة أو تسليم المشروع، يمكنه بدء نزاع خلال 48 ساعة من التسليم.</p>
<p>5.2 ستقوم المنصة بوساطة النزاعات بعدالة وقد تطلب معلومات أو أدلة إضافية من كلا الطرفين.</p>
<p>5.3 القرارات التي تتخذها المنصة في حل النزاعات نهائية وملزمة.</p>
<p><br></p>
<p><strong>6.&nbsp;</strong><strong>الاسترداد</strong></p>
<p>6.1 يتم إصدار المبالغ المستردة فقط إذا:</p>
<ul>
    <li>فشل المستقل في تسليم العمل،</li>
    <li>كان العمل المسلّم غير قابل للاستخدام ورفض المستقل إجراء التعديلات،</li>
    <li>تم حل النزاع لصالح العميل.</li>
</ul>
<p>6.2 يجب تقديم جميع طلبات النزاع خلال 48 ساعة من تسليم المشروع.</p>
<p>6.3 في حال تم منح استرداد، فسيُستثنى منه ضريبة القيمة المضافة ورسوم المنصة، ما لم تقرر المنصة خلاف ذلك.</p>
<p><br></p>
<p><strong>7.&nbsp;</strong><strong>الضرائب</strong></p>
<p>تُطبق القوانين الضريبية المصرية السارية في جمهورية مصر العربية، وكذلك أي تعديلات تطرأ عليها.</p>
<p><br></p>
<p><strong>8.&nbsp;</strong><strong>مكافحة</strong><strong>&nbsp;</strong><strong>الاحتيال</strong><strong>&nbsp;</strong><strong>والامتثال</strong></p>
<p>8.1 قد تقوم المنصة بتعليق مؤقت للأموال في حالات الاشتباه في الاحتيال، أو النشاط المشبوه، أو الاعتراضات على المدفوعات، أو الطلبات القانونية.</p>
<p>8.2 يجب على المستخدمين الامتثال لجميع اللوائح المالية المحلية والدولية.</p>
<p><br></p>
<p><strong>9.&nbsp;</strong><strong>التعديلات</strong><strong>&nbsp;</strong><strong>على</strong><strong>&nbsp;</strong><strong>شروط</strong><strong>&nbsp;</strong><strong>الدفع</strong></p>
<p>9.1 تحتفظ المنصة بالحق في تعديل هذه الشروط في أي وقت. سيتم نشر التعديلات على الموقع الإلكتروني وتدخل حيز التنفيذ فورًا ما لم يُذكر خلاف ذلك.</p>
<p>9.2 إن استمرارك في استخدام المنصة بعد إجراء التعديلات يُعد موافقة ضمنية على الشروط الجديدة.</p>
<p><br></p>
<p><strong>10.&nbsp;</strong><strong>معلومات</strong><strong>&nbsp;</strong><strong>الاتصال</strong></p>
<p>إذا كانت لديك أي أسئلة بخصوص هذه الشروط والأحكام الخاصة بالدفع، يُرجى التواصل معنا عبر البريد الإلكتروني:<br><a href="mailto:info@duvdu.com">info@duvdu.com</a></p>
<p><br></p>
</div>`

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

