import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { getCategory } from '../../redux/action/apis/category/getCategories';
import Link from 'next/link';
import { useRouter } from "next/router";

const MegaMenu = ({ language, api, categories }) => {
  return (
    <ul className='flex flex-wrap gap-x-4'>
      {categories &&
        categories.map((category, index) => (
          <Category key={index} category={category} language={language} />
        ))}
    </ul>
  );
}

const Category = ({ category, language }) => {
  const megaMenuRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (megaMenuRef.current) {
      const computedStyle = window.getComputedStyle(megaMenuRef.current);
      megaMenuRef.current.removeAttribute('style');
      if (language == 'English') {
        const rightPosition = parseFloat(computedStyle.getPropertyValue('right'));
        if (rightPosition < 0) {
          megaMenuRef.current.style.right = '0px';
        }
      }
      else {
        const leftPosition = parseFloat(computedStyle.getPropertyValue('left'));
        if (leftPosition < 0) {
          megaMenuRef.current.style.left = '0px';
        }
      }
    }
  }, [language]);

  const handleNavigation = (path, query) => {
    const url = query ? `${path}?${query}` : path;
    router.push(url);
  };

  return (
    <li className='header-category'>
      <div
        className='category-name cursor-pointer border-b-4 border-t-4 border-transparent opacity-70 lg:text-[13px] xl:text-base capitalize py-1'
        onClick={() => handleNavigation(`/${category.cycle}?category=${category._id}`)}
      >
        {category.title}
      </div>
      <ul className="hover-menu" ref={megaMenuRef}>
        <div>
          {category.subCategories.map((subcategory, subIndex) => (
            subIndex / category.subCategories.length < 0.5 &&
            <MenuItem
              key={subIndex}
              title={subcategory.title}
              items={subcategory.tags}
              onClick={(tagId) => handleNavigation(`/${category.cycle}`, `category=${category._id}&subcategory=${subcategory._id}&${ tagId ? "tag=" + tagId : ''}`)}
              cycle={category.cycle}
            />
          ))}
        </div>
        {category.subCategories.length > 1 &&
          <div>
            {category.subCategories.map((subcategory, subIndex) => (
              subIndex / category.subCategories.length >= 0.5 &&
              <MenuItem
                key={subIndex}
                title={subcategory.title}
                items={subcategory.tags}
                onClick={(tagId) => handleNavigation(`/${category.cycle}`, `subcategory=${subcategory._id}&${tagId ? "tag=" + tagId : ''}`)}
                cycle={category.cycle}
              />
            ))}
          </div>
        }
      </ul>
    </li>
  );
}

const MenuItem = ({ title, items, onClick, cycle }) => (
  items.length > 0 &&
  <li>
    <div
      className="cursor-pointer text-[#3E3E3E] dark:text-[#FFFFFFBF] font-semibold text-sm"
      onClick={() => onClick(null)}
    >
      {title}
    </div>
    <ul className={"gap-1"}>
      {items.map((item, index) => (
        <li className='py-1 px-2 border hover:border-primary hover:text-[#3E3E3E] hover dark:border-[#FFFFFF4D] rounded-full' key={index}>
          <div
            className='cursor-pointer dark:text-[#FFFFFFBF] text-[#3E3E3E] hover:text-[#3E3E3E]'
            onClick={() => onClick(item._id)}
          >
            {item.title}
          </div>
        </li>
      ))}
    </ul>
  </li>
);

const mapStateToProps = (state) => ({
  language: state.setting.LANGUAGE,
  api: state.api,
  categories: state.categories
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MegaMenu);
