const FilterInput = ({ placeholder, name, value, onChange }) => (
    <input className="mt-2 p-2 border rounded w-full" placeholder={placeholder} name={name} value={value} onChange={onChange} />
);

export default FilterInput;
