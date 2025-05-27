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
      <nav className="p-4 shadow-sm flex justify-between items-center">
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
            <div className='blog-gradient inset-x-0 top-1/2  bottom-0  absolute flex flex-col items-center justify-end'>
                <div className='w-4/5 md:w-1/2 flex flex-col items-center justify-center text-center'>
                    <h2 className="text-2xl md:text-6xl font-bold mb-2 md:mb-4 text-[#012837] dark:text-[#AAAAAA]">{t('home.subtitle')}</h2>
                    <p className="text-sm md:text-base md:font-semibold max-w-2xl md:mb-8 text-[#012837] dark:text-[#AAAAAA] opacity-80">{t('home.description')}</p>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className=" py-16">
        

        {/* "Join Us" Banner */}
          <div className="bg-cover flex items-center bg-center h-[400px] rounded-[40px] overflow-hidden" style={{ backgroundImage: "url('/assets/imgs/about/blog.jpg')"  }}>

            <div className="text-white flex items-center blog-gradient2 h-full  p-8">
              <div className="text-white "> 
                <h3 className="text-5xl mb-4">Want To Be A Part Of This?</h3>
                <p className="mb-6 max-w-2xl text-white">
                consectetur sit amet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ut labore consectetur sit amet adipiscing elit, sed do.
                </p>
                <Link href="/contact_us">
                  <a className="inline-block bg-white !text-[#000] font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300">
                    {t('common.join')}
                  </a>
                </Link>
              </div> 
            </div>
        </div>
      </div>
    </div>
    </section>
    </Layout>
  );
};

export default HairTransplantHome; 