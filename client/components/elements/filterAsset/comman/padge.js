const Padge = ({ children, onClick }) => (
    <div className="mt-2 p-1 px-3 rounded-full cursor-pointer border-black border-opacity-50 border-[1.5px]" onClick={onClick}>
        {children}
    </div>
);

export default Padge;
