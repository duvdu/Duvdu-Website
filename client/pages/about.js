import React from "react";
import Layout from "../components/layout/Layout";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation(); // <-- specify namespace
  const [openFaq, setOpenFaq] = React.useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqItems = t("about_us.faq.items", { returnObjects: true });

  return (
    <Layout isbodyWhite={true}>
      <section className="w-full bg-[#F2F2F3] dark:bg-[#1A1A1C]">
        <div className="container lg:mx-auto min-h-screen py-10 space-y-10">
          <div>
            <h1 className="text-4xl font-bold mb-4">
              {t("about_us.heading")}
            </h1>
            {[1,2,3,4].map(i => (
              <p key={i} className="mb-4">
                {t(`about_us.intro.p${i}`)}
              </p>
            ))}
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-6">
              {t("about_us.faq.heading")}
            </h2>
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="mb-4 bg-white dark:bg-[#404040] p-6 rounded-lg shadow"
              >
                <button
                  className="w-full flex justify-between items-center text-left"
                  onClick={() => toggleFaq(idx)}
                >
                  <span className="text-xl font-medium">
                    {item.q}
                  </span>
                  <span className="text-2xl transform transition-transform duration-200">
                    {openFaq === idx ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`mt-4 text-gray-700 dark:text-gray-300 transition-max-h duration-300 overflow-hidden ${
                    openFaq === idx ? "max-h-screen" : "max-h-0"
                  }`}
                >
                  <p className="whitespace-pre-line">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
