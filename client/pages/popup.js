
import Layout from '../components/layout/Layout';
import Clients from '../components/popsup/clients';
import { useTranslation } from 'react-i18next';



function Test() {
    const { t } = useTranslation();

    return (
        <>
            <Layout>
                <div className='container'>
                    <div className='flex flex-col max-w-[350px] w-full gap-1 mt-4'>

                        <BTN target='clients'>{t("clients")}</BTN>

                    </div>


                    {/* <Dashboard /> */}

                    <Clients />
          
                </div>
              
            </Layout>
        </>
    );
}

const BTN = ({ target, children, ...rest }) => <button {...rest} className='bg-green-700 p-3 rounded-xl text-white' data-popup-toggle="popup" data-popup-target={target}> {children} </button>


export default Test;
