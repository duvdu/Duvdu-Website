import Link from 'next/link';

const appbutton = ({text,onClick,href="",className, ...rest}) => {
    
    return (
        <>
        <Link href={href}>
             <a onClick={onClick} className={`system-buttom cursor-pointer px-36 py-7 ${className}`} {...rest}>
                <span>{text}</span>
            </a>
        </Link>
        </>
    );
};
export default appbutton;
