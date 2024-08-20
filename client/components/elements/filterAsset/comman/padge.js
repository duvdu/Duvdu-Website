const Padge = ({ children, onClick, isSelected }) => (
    <div
        className={`mt-2 p-1 px-3 rounded-full cursor-pointer border-[1.5px] ${
            isSelected
                ? 'bg-blue-500 text-white border-blue-500 dark:bg-blue-700 dark:border-blue-700'
                : 'bg-white text-black border-black border-opacity-50 dark:bg-gray-800 dark:text-white dark:border-gray-600'
        }`}
        onClick={onClick}
    >
        {children}
    </div>
);

export default Padge;
