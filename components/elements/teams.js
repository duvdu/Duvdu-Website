import React, { useEffect, useState, useRef } from 'react';
import Icon from '../Icons';

const BookTeam = ({ team, onChange }) => {
    const [localteam, setLocalTeam] = useState(team);
    const handleRemoveItem = (id) => {
        setLocalTeam(prevTeam => prevTeam.filter(item => item._id !== id));
    };
    useEffect(() => setLocalTeam(team) , [])
    useEffect(() => onChange?.(localteam.map((i)=> i._id)) , [localteam])
    return (
        localteam &&
        localteam.map((item, i) => (
            <div key={i} className="flex">
                <div key={i} className="team-padge">
                    {item.profileImage&& <img src={item.creative.profileImage} alt="user" />}
                    <span className="mx-3">{item.name}</span>
                </div>
                {
                    <div className="team-padge">
                        <span className="mx-3">{item.fees} $</span>
                    </div>
                }
                {
                    item.occupation &&
                    <div className="team-padge">
                        <span className="mx-3">{item.creative.occupation||""} $</span>
                    </div>
                }
                {
                    item.removable ? item.removable : true &&
                    <div className="remove-padge cursor-pointer" onClick={() => handleRemoveItem(item._id)}>
                        <span className="mx-3 capitalize">remove</span>
                        <div className="bg-[#FF4646] rounded-full aspect-square flex items-center justify-center p-1">
                            <Icon className='text-white' name="xmark" />
                        </div>
                    </div>
                }
            </div>
        ))
    );
};

export default BookTeam;
