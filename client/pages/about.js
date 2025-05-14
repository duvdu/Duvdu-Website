import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Layout from "../components/layout/Layout";

const About = () => {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = React.useState(null);

  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  const faqItems = [
    {
      question: t('faq.industries'),
      answer: `We specialize in medical tourism, particularly hair transplantation and cosmetic procedures. Our services cater to clients from around the world looking for high-quality, affordable medical treatments in Turkey.`,
    },
    {
      question: t('faq.integration'),
      answer: `Yes, we integrate with various third-party tools and APIs including payment gateways, appointment scheduling systems, medical record platforms, and customer relationship management software to provide a seamless experience for our clients.`,
    },
    {
      question: t('faq.timeline'),
      answer: `The timeline for a hair transplant procedure varies depending on the technique used and the extent of the transplant. The actual procedure typically takes between 4-8 hours in a single day. Recovery time varies, but most patients can return to normal activities within 7-10 days. Visible results usually appear within 3-4 months, with full results seen after 12-18 months.`,
    },
    {
      question: t('faq.process'),
      answer: `The process begins with a consultation where we assess your specific needs and determine if you're a suitable candidate for a hair transplant. If you decide to proceed, we'll schedule your procedure, help with travel arrangements if needed, and provide comprehensive pre-operative instructions. After the procedure, we offer follow-up care and guidance throughout your recovery.`,
    },
    {
      question: t('faq.support'),
      answer: `Yes, we provide ongoing support and maintenance for all our clients. Our post-operative care includes regular check-ins, guidance on hair care and maintenance, and assistance with any questions or concerns that may arise during the recovery period. We also offer long-term follow-up to ensure optimal results from your hair transplant procedure.`,
    },
    {
      question: `When is the right time for a hair transplant?`,
      answer: `Hair loss can affect people of all ages, but determining the ideal time for a hair transplant is crucial. Typically, it's advisable to consider a hair transplant when you have stabilized your hair loss. This means that your hair loss has not progressed significantly over the past year or so. Getting a hair transplant too early, when hair loss is still active, can result in the need for additional procedures as hair loss continues.`,
    },
  ];

  return (
    <Layout isbodyWhite={true}>
    <section className="w-full ">
    <div className="min-h-screen bg-gray-50 pb-10 pt-1">
      

      {/* Main Content */}
      <div className="lg:mx-auto lg:container ">
        <div className="min-h-screen bg-gray-50">
          {/* Navigation */}
          <div className="mt-10">
          <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">{t('faq.title')}</h1>
            
            <div className="mb-16">
              {faqItems.map((item, index) => (
                <div 
                  key={index} 
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <button
                    className="flex justify-between items-center w-full py-6 text-left"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="text-xl font-medium text-gray-800">{item.question}</span>
                    <span className={`text-2xl transition-transform duration-200 ${openFaq === index ? 'transform rotate-180' : ''}`}>
                      +
                    </span>
                  </button>
                  <div 
                    className={`transition-all duration-300 overflow-hidden ${
                      openFaq === index ? 'max-h-96 pb-6' : 'max-h-0'
                    }`}
                  >
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>

        </div>
        </div>
        </div>
    </div>
    </section>
    </Layout>
  );
};

export default About; 