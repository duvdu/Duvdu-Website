import { OpenPopUp } from "../../../util/util";
import Icon from "../../Icons";
import Share from "../../popsup/Share";

function Conver({ converPic }) {
    const openShare = () => {
        OpenPopUp("Share")
    };

    return <>
        <Share url={window.location.href} title={'Look That Creative 👀'} />
        <div className='cover h-[150px] sm:h-[300px] sm:rounded-b-[55px] relative' style={{ backgroundImage: `url('${converPic}')`  }} >
            <Icon onClick={openShare} name='share2' className='absolute cursor-pointer right-6 sm:left-6 bottom-6' />
        </div>
    </>
}

export default Conver