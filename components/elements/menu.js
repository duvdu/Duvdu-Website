import Link from 'next/link';
import { useState, useEffect, useRef } from "react";
import headerMen from '../../public/static/header_content.json';

const MenuItem = ({ title, items }) => (
  items.length > 0 &&
  <li>
    <Link legacyBehavior href="#">
      <a className="text-black font-bold text-lg">
        {title}
      </a>
    </Link>
    <ul>
      {items.map((item, index) => (
        <li className='padge' key={index}>
          <Link legacyBehavior href="/">
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

const Category = ({category}) => {
  const megaMenuRef = useRef(null);

  useEffect(() => {
    if (megaMenuRef.current) {
      const computedStyle = window.getComputedStyle(megaMenuRef.current);
      const rightPosition = parseFloat(computedStyle.getPropertyValue('right'));
      if (rightPosition < 0) {
        megaMenuRef.current.style.right = '0px';
      }
    }
  }, []);
  return (
    <li className="position-static" >
      <div className='cursor-pointer border-b-2 border-t-2 border-transparent hover:border-b-primary opacity-70 text-base py-2 capitalize'>
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
