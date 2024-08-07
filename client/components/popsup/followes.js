import { connect } from 'react-redux';
import { getUserFollowers } from '../../redux/action/apis/auth/profile/getFollowerList';
import Popup from '../elements/popup';
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

function Followers({
    getUserFollowers_respond,
    getUserFollowers,
    ...rest
}) {
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        if (getUserFollowers_respond) {
            setLoading(false);
            }
    }, [getUserFollowers_respond]);

    const onOpen = () => {
        setLoading(true);
        getUserFollowers();
    };

    return (
        <>
            <Popup onOpen={onOpen} header={'Followers'} {...rest}>
                <div className='flex flex-col gap-5 my-16 max-h-[600px] overflow-y-scroll'>
                    {loading ? (
                        <img className={"load mx-auto transition duration-500 ease-in-out size-14"} src="/assets/imgs/loading.gif" alt="loading" />
                    ) : (
                        getUserFollowers_respond && getUserFollowers_respond.data && getUserFollowers_respond.data.length > 0 ? (
                            getUserFollowers_respond.data.map((item, index) => (
                                <Person key={index} data={item.follower} />
                            ))
                        ) : (
                            <p>{t("No followers found.")}</p>
                        )
                    )}
                </div>
            </Popup>
        </>
    );
}

function Person({ data }) {
    return (
        <Link href={`/creative/${data.username}`}>
            <div className='flex gap-4 h-12 sm:min-w-[400px] cursor-pointer'>
                <img
                    className='rounded-full h-full aspect-square object-cover object-top'
                    src={data.profileImage}
                    alt='profile img'
                />
                <div className='w-full flex flex-col justify-between'>
                    <span className='text-DS_black text-[15px] opacity-80 font-semibold'>{data.name}</span>
                    <span className='text-DS_black text-[13px] opacity-50'>@{data.username}</span>
                </div>
            </div>
        </Link>
    );
}

const mapStateToProps = (state) => ({
    getUserFollowers_respond: state.api.getUserFollowers
});

const mapDispatchToProps = {
    getUserFollowers
};

export default connect(mapStateToProps, mapDispatchToProps)(Followers);
