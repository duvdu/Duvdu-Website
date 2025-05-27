import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from 'react-i18next';

const MegaMenu = ({ language, api, categories }) => {
  return (
    <ul className='flex flex-nowrap gap-x-4 overflow-x-auto hide-scrollable-container'>
      {categories &&
        categories.map((category, index) => (
          <Category key={index} category={category} language={language} />
        ))}
    </ul>
  );
};

const Category = ({ category, language }) => {
  const megaMenuRef = useRef(null);
  const { t , i18n } = useTranslation();

  const router = useRouter();

  const adjustMenuPosition = () => {
    if (megaMenuRef.current) {
      const computedStyle = window.getComputedStyle(megaMenuRef.current);
      megaMenuRef.current.removeAttribute('style');

      // if (window.innerWidth <= 768) {
      //   // Force right alignment on mobile view
      //   megaMenuRef.current.style.right = '0px';
      // } else {
        // Apply language-based alignment for larger screens
        if (i18n.language !== "Arabic") {
          const rightPosition = parseFloat(computedStyle.getPropertyValue('right'));
          if (rightPosition < 0) {
            megaMenuRef.current.style.right = '0px';
          }
        } else {
          const leftPosition = parseFloat(computedStyle.getPropertyValue('left'));
          if (leftPosition < 0) {
            megaMenuRef.current.style.left = '0px';
          }
        }
      // }
    }
  };

  useEffect(() => {
    // Run the alignment function initially
    adjustMenuPosition();
    // Add resize event listener to adjust on screen size changes
    window.addEventListener('resize', adjustMenuPosition);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', adjustMenuPosition);
    };
  }, [language]);

  const handleNavigation = (path, query) => {
    const url = query ? `${path}?${query}` : path;
    router.push(url);
  };

  return (
    <li className='header-category'>
      <div
        className='category-name cursor-pointer whitespace-nowrap border-b-4 border-t-4 border-transparent opacity-70 lg:text-[13px] xl:text-base capitalize py-1'
        onClick={() => handleNavigation(`/${category.cycle}?category=${category._id}`)}
      >
        {category.title}
      </div>
      <ul className="hover-menu flex-col lg:flex-row" ref={megaMenuRef}>
        <div>
          {category.subCategories.map((subcategory, subIndex) => (
            subIndex / category.subCategories.length < 0.5 &&
            <MenuItem
              key={subIndex}
              title={subcategory.title}
              items={subcategory.tags}
              onClick={(tagId) => handleNavigation(`/${category.cycle}`, `category=${category._id}&subCategory=${subcategory._id}&${ tagId ? "tag=" + tagId : ''}`)}
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
                onClick={(tagId) => handleNavigation(`/${category.cycle}`, `category=${category._id}&subCategory=${subcategory._id}&${ tagId ? "tag=" + tagId : ''}`)}
                cycle={category.cycle}
              />
            ))}
          </div>
        }
      </ul>
    </li>
  );
};

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
