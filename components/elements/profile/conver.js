import Icon from "../../Icons";

function Conver({ converPic }) {
    return <div className='cover h-[150px] sm:h-[300px] sm:rounded-b-[55px] relative' style={{ backgroundImage: `url('${converPic}')` }} >
        <Icon name='share2' className='absolute cursor-pointer right-6 sm:left-6 bottom-6' />
    </div>
}

export default Conver