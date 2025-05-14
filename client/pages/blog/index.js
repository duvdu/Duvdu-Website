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
    <div className="min-h-screen bg-gray-50 pb-10 pt-1">
      

      {/* Main Content */}
      <div className="lg:mx-auto lg:container ">

        {/* Latest Blogs Section */}
        <div className="mt-10">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">{t('blogs.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-lg overflow-hidden shadow-md">
                <img 
                  src={`/assets/imgs/blog-${item}.jpg`} 
                  alt={`Blog ${item}`} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">BRANDING / DESIGN / 24.OCT.2022</div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Four Ways a Clean Workplace Makes Employees Happy and Healthy</h3>
                  <div className="flex items-center">
                    <span className="text-blue-600 font-medium">{t('blogs.readMore')}</span>
                    <svg className="w-4 h-4 ml-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
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