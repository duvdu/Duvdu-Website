import React, { useEffect, useState, useRef } from 'react';
import Icon from '../Icons';
import { useTranslation } from 'react-i18next';

const BookTeam = ({ team,current, unit , onChange ,pricerPerUnit, mainremovable = true }) => {
    const { t } = useTranslation();
    const [localteam, setLocalTeam] = useState(team);
    const handleRemoveItem = (id) => {
        setLocalTeam(prevTeam => prevTeam.filter(item => item._id !== id));
    };
    useEffect(() => setLocalTeam(team) , [])
    useEffect(() => onChange?.(localteam?.map((i)=> i._id)) , [localteam])
    return (
        localteam &&
        localteam.map((item, i) => (
            <div key={i} className="flex">
                <div key={i} className="team-padge">
                    {item.profileImage&& <img className='object-cover object-top rounded-full aspect-square' src={item.profileImage} alt="user" />}
                    <span className="mx-3">{item.name}</span>
                    {pricerPerUnit && <span className="mx-3">{current} {unit}s {pricerPerUnit*current} EGP</span>}
                </div>
                
                {
                    item.unitPrice &&
                    <div className="team-padge">
                        <span className="mx-3">{item.unitPrice*current} $</span>
                    </div>
                }
                {
                    item.occupation &&
                    <div className="team-padge">
                        <span className="mx-3">{item.occupation||""} $</span>
                    </div>
                }
                    
                {
                    ( mainremovable && !item.removable) &&
                    <div className="remove-padge cursor-pointer" onClick={() => handleRemoveItem(item._id)}>
                        <span className="mx-3 capitalize">{t("remove")}</span>
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
