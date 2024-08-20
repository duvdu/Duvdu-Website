const FilterContainer = ({ children, toggleDrawer }) => (
    <>
        <div
            className="hidden md:block fixed top-0 left-0 w-screen h-screen bg-black opacity-30 z-20"
            onClick={toggleDrawer}
        />
        <div className="md:absolute bg-white md:dark:bg-gray-900 md:border border-[#E6E6E6] dark:bg-black dark:border-gray-700 rounded-lg mt-1 px-5 md:p-5 w-full md:w-[410px] z-30">
            {children}
        </div>
    </>
);

export default FilterContainer;
