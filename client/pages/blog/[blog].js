import React from 'react';
import { useRouter } from "next/router";
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Layout from "../../components/layout/Layout";

const HairTransplantHome = () => {
  const { t } = useTranslation();
  const Router = useRouter();
  const searchTerm = Router.query.search;

  return (
    <Layout isbodyWhite={true} iSsticky={!searchTerm}>
    <section className="my-12">
        <div className="container mb-30">
      {/* Navigation */}
      <nav className="p-4 bg-white shadow-sm flex justify-between items-center">
        <div>
          <Link href="/">
            <a className="text-gray-700 hover:text-blue-600 transition">
              <span className="text-sm">← {t('common.back')}</span>
            </a>
          </Link>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="relative">
        <div className="bg-cover bg-center rounded-t-[40px] h-[400px] md:h-[800px]" style={{ backgroundImage: "url('/assets/imgs/about/about.jpg')" }}>
          <div className="">
            <div className='about-gradaint inset-x-0 top-1/2  bottom-0  absolute flex flex-col items-center justify-end'>
                <div className='w-4/5 md:w-1/2 flex flex-col items-center justify-center text-center'>
                    <h2 className="text-2xl md:text-6xl font-bold mb-2 md:mb-4">{t('home.subtitle')}</h2>
                    <p className="text-sm md:text-base md:font-semibold max-w-2xl md:mb-8">{t('home.description')}</p>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{t('home.title')}</h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <img
              src="/assets/imgs/transplant-procedure.jpg"
              alt="Hair Transplant Procedure"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-gray-700 mb-6">
              Are you tired of dealing with hair loss and considering the option of a hair transplant? Turkey has emerged as a sought after destination for individuals seeking effective and affordable hair transplant procedures. In this article we will explore the specifics of undergoing a hair transplant in Turkey. We'll cover topics such as determining the time to proceed with the surgery, the significance of having donor hair for successful outcomes, distinguishing between traditional hair plugs and modern techniques available methods for restoring hair, the step by step procedure itself, the healing process involved and when visible results can be expected.
            </p>
            <Link href="/hair-transplant/about">
              <a className="text-blue-600 hover:text-blue-800 font-medium transition">
                {t('home.cta')} →
              </a>
            </Link>
          </div>
        </div>

        {/* "Join Us" Banner */}
        <div className="bg-blue-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Want To Be A Part Of This?</h3>
          <p className="mb-6 max-w-2xl mx-auto">
            Join our network of satisfied clients who have experienced successful hair restoration treatments and regained their confidence.
          </p>
          <Link href="/hair-transplant/contact">
            <a className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-md hover:bg-gray-100 transition duration-300">
              {t('common.join')}
            </a>
          </Link>
        </div>
      </div>
    </div>
    </section>
    </Layout>
  );
};

export default HairTransplantHome; 