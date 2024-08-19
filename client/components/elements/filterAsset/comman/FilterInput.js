const FilterInput = ({ placeholder, name, value, onChange }) => (
    <input 
    className="mt-2 p-2 border rounded w-full bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600" 
    placeholder={placeholder} 
    name={name} 
    value={value} 
    onChange={onChange} 
/>
);

export default FilterInput;
