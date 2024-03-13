import Link from 'next/link';
import { server } from "../../config/index";
import React, { useEffect, useState } from "react";
import headerMen from '../../public/static/header_content.json';





const MenuItem = ({ title, items }) => (
  items.length > 0 &&
  <li className="">
    <Link href="#">
      <a className="text-black font-bold text-lg">
        {title}
      </a>
    </Link>
    <ul>
      {items.map((item, index) => (
        <li className='padge' key={index}>
          <Link href="/">
            <a>{item}</a>
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
    // fetchData();
  }, []);

  return (
    <ul className='flex justify-between'>
      {
        categories &&
        categories.map((category, index) => (
          <li className="position-static" key={index}>
            <div className='cursor-pointer hover:border-b-2 border-primary opacity-70 text-base py-2 capitalize'>
              {category.category}
              {/* <i className="fi-rs-angle-down"></i> */}
            </div>
            <ul className="mega-menu">
              <div className=''>
                {
                  category.subcategories.map((subcategory, subIndex) => (
                    subIndex / category.subcategories.length < 0.5 &&
                    <MenuItem key={subIndex} title={subcategory.title} items={subcategory.items} />
                  ))
                }
              </div>

              {
                category.subcategories.length > 1 &&
                <div className='mega-column'>
                  {
                    category.subcategories.map((subcategory, subIndex) => (
                      subIndex / category.subcategories.length >= 0.5 &&
                      <MenuItem key={subIndex} title={subcategory.title} items={subcategory.items} />
                    ))}
                </div>
              }
            </ul>
          </li>
        ))}
    </ul>
  );
}

export default MegaMenu;
