import Link from 'next/link';
import { useState, useEffect, useRef } from "react";
import headerMen from '../../public/static/header_content.json';

const MenuItem = ({ title, items }) => (
  items.length > 0 &&
  <li>
    <Link legacyBehavior href="#">
      <a className="text-[#3E3E3E] dark:text-[#FFFFFFBF] font-semibold text-sm">
        {title}
      </a>
    </Link>
    <ul className={"gap-1"}>
      {items.map((item, index) => (
        <li className='py-1 px-2 border border-[#00000080] dark:border-[#FFFFFF4D] rounded-full' key={index}>
          <Link legacyBehavior href="/">
            <a className='dark:text-[#FFFFFFBF] text-[#3E3E3E]'>{item}</a>
          </Link>
        </li>
      ))}
    </ul>
  </li>
);

const MegaMenu = () => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    setCategories(headerMen);
  }, []);



  return (
    <ul className='flex justify-between'>
      {categories &&
        categories.map((category, index) => (
          <Category key={index} category={category} />
        ))}
    </ul>
  );

}

const Category = ({ category }) => {
  const megaMenuRef = useRef(null);

  useEffect(() => {
    if (megaMenuRef.current) {
      const computedStyle = window.getComputedStyle(megaMenuRef.current);
      if (localStorage.getItem('lang') == 'English') {
        const rightPosition = parseFloat(computedStyle.getPropertyValue('right'));
        if (rightPosition < 0) {
          megaMenuRef.current.style.right = '0px';
        }
      }
      else {
      const rightPosition = parseFloat(computedStyle.getPropertyValue('left'));
        if (rightPosition < 0) {
          megaMenuRef.current.style.left = '0px';
        }
      }
    }
  }, [category]);
  return (
    <li className='header-category'>
      <div className='category-name cursor-pointer border-b-4 border-t-4 border-transparent opacity-70 lg:text-[13px] xl:text-base capitalize py-1'>
        {category.category}
      </div>
      <ul className="hover-menu" ref={megaMenuRef}>
        <div>
          {category.subcategories.map((subcategory, subIndex) => (
            subIndex / category.subcategories.length < 0.5 &&
            <MenuItem key={subIndex} title={subcategory.title} items={subcategory.items} />
          ))}
        </div>
        {category.subcategories.length > 1 &&
          <div>
            {category.subcategories.map((subcategory, subIndex) => (
              subIndex / category.subcategories.length >= 0.5 &&
              <MenuItem key={subIndex} title={subcategory.title} items={subcategory.items} />
            ))}
          </div>
        }
      </ul>
    </li>
  );
}

export default MegaMenu;
