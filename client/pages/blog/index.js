import React from 'react';
import { useRouter } from "next/router";

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Layout from "../../components/layout/Layout";

const FAQ = () => {
  const { t } = useTranslation();
  const Router = useRouter();
  const searchTerm = Router.query.search;

  return (
    <Layout isbodyWhite={true} iSsticky={!searchTerm}>
    <section className="w-full ">
    <div className="min-h-screen pb-10 pt-1">
      

      {/* Main Content */}
      <div className="lg:mx-auto lg:container ">

        {/* Latest Blogs Section */}
        <div className="mt-10">
          <h2 className="text-3xl font-bold mb-10 ">{t('blogs.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={`/assets/imgs/blog-${item}.jpg`} 
                  alt={`Blog ${item}`} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text- text-[#AAAAAA] mb-2">BRANDING / DESIGN / 24.OCT.2022</div>
                  <h3 className="text-xl font-bold mb-4 ">Four Ways a Clean Workplace Makes Employees Happy and Healthy</h3>
                  <Link href={`/blog/1`}>
                    <div className="flex items-center cursor-pointer gap-2">
                      <svg width="39" height="24" viewBox="0 0 39 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="27.3" cy="12.0498" r="11.025" stroke="#DEDEDE" stroke-width="1.05"/>
                        <path d="M30.8212 12.421C31.0263 12.216 31.0263 11.8836 30.8212 11.6786L27.4802 8.33749C27.2751 8.13247 26.9427 8.13247 26.7377 8.33749C26.5327 8.54252 26.5327 8.87493 26.7377 9.07996L29.7075 12.0498L26.7377 15.0197C26.5327 15.2247 26.5327 15.5571 26.7377 15.7621C26.9427 15.9671 27.2751 15.9671 27.4802 15.7621L30.8212 12.421ZM0 12.0498V12.5748H30.45V12.0498V11.5248H0V12.0498Z" fill="#595959"/>
                      </svg>
                      <span className="text-[#595959] font-medium">{t('blogs.readMore')}</span>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </section>
    </Layout>
  );
};

export default FAQ; 