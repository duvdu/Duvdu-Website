import Padge from './padge';

const BoolOfPadges = ({ list = [], onSelect, isSelected }) => (
    <div className='flex flex-wrap gap-1'>
    
        {list.map((item, index) => (
            <Padge
                key={index}
                onClick={() => onSelect(item)}
                isSelected={isSelected.includes(item._id)}
            >
                {item.title??item.name}
            </Padge>
        ))}
    </div>
);

export default BoolOfPadges;
