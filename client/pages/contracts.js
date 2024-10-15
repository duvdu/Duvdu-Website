
import Layout from '../components/layout/Layout';
import LeftSide from '../components/pages/contracts/leftSide';
import RightSide from '../components/pages/contracts/rightSide';
import Loadingcomponent from '../components/pages/contracts/loadingcomponent';
import ReceiveProjectFiles from '../components/drawer/contaract/project-details';
import React from 'react';
import { connect } from "react-redux";
import { useRouter } from "next/router";

function Contracts({isLogin}) {
    const [indexTab, setIndexTab] = React.useState(0);
    const route = useRouter()
    React.useEffect(()=>{
        if(!isLogin)
            route.push('/')
    },[isLogin])

    return (
        <>
            <ReceiveProjectFiles />
            <Layout shortheader={true}>
                <div className='container'>
                    <div className='flex flex-col lg:flex-row gap-9'>
                        <div className='w-full'>
                            <LeftSide RightSidehandleToggleClick={(value) => setIndexTab(value)} />
                        </div>
                        <div className='w-[1px] hidden lg:block h-body bg-black dark:bg-white opacity-20'></div>
                        <div className='w-full lg:w-auto'>
                            {true ?
                                <RightSide tabindex={indexTab}/> :
                                <Loadingcomponent />
                            }
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}


const mapStateToProps = (state) => ({
    isLogin: state.auth.login,

});

// *****************
export default connect(mapStateToProps)(Contracts);
