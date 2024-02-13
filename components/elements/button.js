import Link from 'next/link';

const appbutton = ({ text, color, onClick, href = "", className, ...rest }) => {

    let buttonClass;

    switch (color) {
        case undefined:
            buttonClass = 'bg-primary';
            break;
        case 'bg-[#D30000]':
            buttonClass = 'bg-[#D30000]';
            break;
        default:
            buttonClass = `bg-[${color}]`;
            break;
    }

    return (
        <>
            
            <div onClick={onClick} className={`${buttonClass} system-buttom cursor-pointer px-36 py-7 ${className}`} {...rest}>
                <a href={href}>
                    <span className='whitespace-nowrap'>{text}</span>
                </a>
            </div>
            
        </>
    );
};
export default appbutton;
