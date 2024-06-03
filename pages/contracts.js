
import Layout from '../components/layout/Layout';
import LeftSide from '../components/elements/contracts/leftSide';
import EmptyComponent from '../components/elements/contracts/emptyComponent';
import RightSide from '../components/elements/contracts/rightSide';
import Loadingcomponent from '../components/elements/contracts/loadingcomponent';

function Contracts() {

    return (
        <>
            <Layout shortheader={true} isbodyWhite={true}>
                <div className='container'>
                    <div className='flex flex-col lg:flex-row gap-9'>
                        <div className='w-full'>
                            {true ? <LeftSide /> :
                                <div className='mt-16'>
                                    <h1 className="page-header pb-6">ongoing contracts</h1>
                                    <EmptyComponent />
                                </div>
                            }
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
