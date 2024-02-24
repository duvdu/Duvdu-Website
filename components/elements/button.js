import Link from 'next/link';

const appbutton = ({ text, color, onClick, className = "", ...rest }) => {

    let buttonClass;

    switch (color) {
        case undefined:
            buttonClass = 'bg-primary';
            break;
        case 'bg-[#D30000]':
            buttonClass = 'bg-[#D30000]';
            break;
        case 'bg-[#5666F7]':
            buttonClass = 'bg-[#5666F7]';
            break;
        default:
            buttonClass = `bg-[${color}]`;
            break;
    }

    return (
        <>

            <div onClick={onClick} className={`${buttonClass} system-buttom cursor-pointer px-36 py-7 ${className}`} {...rest}>

                <span className='whitespace-nowrap'>{text}</span>

            </div>

        </>
    );
};
export default appbutton;
