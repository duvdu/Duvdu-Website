const Padge = ({ children, onClick, isSelected }) => (
    <div
        className={`mt-2 p-1 px-3 rounded-full cursor-pointer border-[1.5px] ${
            isSelected
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-black border-black border-opacity-50'
        }`}
        onClick={onClick}
    >
        {children}
    </div>
);

export default Padge;
