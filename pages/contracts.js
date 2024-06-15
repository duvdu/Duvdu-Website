
import Layout from '../components/layout/Layout';
import LeftSide from '../components/elements/contracts/leftSide';
import RightSide from '../components/elements/contracts/rightSide';
import Loadingcomponent from '../components/elements/contracts/loadingcomponent';

function Contracts() {

    return (
        <>
            <Layout shortheader={true} isbodyWhite={true}>
                <div className='container'>
                    <div className='flex flex-col lg:flex-row gap-9'>
                        <div className='w-full'>
                            <LeftSide /> 
                        </div>
                        <div className='w-[1px] hidden lg:block h-body bg-black opacity-20'></div>
                        <div className='w-full lg:w-auto'>
                            {true ?
                                <RightSide />
                                :
                                <Loadingcomponent />
                            }
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}



// *****************
export default Contracts;
