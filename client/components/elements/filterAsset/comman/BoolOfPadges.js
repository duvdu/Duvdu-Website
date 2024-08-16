import Padge from './padge';

const BoolOfPadges = ({ list = [], onSelect }) => (
    <div className='flex flex-wrap gap-3'>
        {list.map((item, index) => (
            <Padge key={index} onClick={() => onSelect(item)}>
                {item}
            </Padge>
        ))}
    </div>
);

export default BoolOfPadges;
