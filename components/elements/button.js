import Link from 'next/link';

const appbutton = ({ text, color, onClick, className = "", ...rest }) => {


    return (
        <>

            <div onClick={onClick} className={`system-buttom cursor-pointer px-36 py-7 ${className}`} {...rest}>

                <span className='whitespace-nowrap'>{text}</span>

            </div>

        </>
    );
};
export default appbutton;
