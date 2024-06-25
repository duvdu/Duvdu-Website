
import Layout from '../components/layout/Layout';
import LeftSide from '../components/pages/contracts/leftSide';
import RightSide from '../components/pages/contracts/rightSide';
import Loadingcomponent from '../components/pages/contracts/loadingcomponent';
import ReceiveProjectFiles from '../components/drawer/contaract/project-details';

function Contracts() {

    return (
        <>
            <ReceiveProjectFiles />
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
