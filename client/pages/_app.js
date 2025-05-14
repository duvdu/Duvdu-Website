import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import "react-responsive-modal/styles.css";
import store from "../redux/store";
import Preloader from "./../components/elements/Preloader";
import "swiper/css";
import "swiper/css/navigation";
import 'react-toastify/dist/ReactToastify.css';
import "react-perfect-scrollbar/dist/css/styles.css";
import "../public/assets/css/main.css";
import "../public/assets/css/project-card.css";
import "../public/assets/css/profile.css";
import "../public/assets/css/dashboard.css";
import "../public/assets/css/project.css";
import "../public/assets/css/chat.css";
import "../public/assets/css/home.css";
import "../public/assets/css/mood_boards.css";
import "../public/assets/css/rtl.css";
import '../util/i18n';
import { OpenChannel } from "../redux/action/apis/realTime/socket/socket";
import { getMyprofile } from "../redux/action/apis/auth/profile/getProfile";
import { GetAllChats } from "../redux/action/apis/realTime/chat/chats";
import useFcmToken from "../util/hooks/useFcmToken";
import firebaseApp from '../util/firebase';
import { getMessaging, onMessage } from 'firebase/messaging';
import Icon from "../components/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SocketProvider } from "../util/socketContext";

function MyApp({ Component, pageProps }) {
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(null);

    const { fcmToken, notificationPermissionStatus } = useFcmToken();

    useEffect(() => {
        const messaging = getMessaging(firebaseApp);

        const unsubscribe = onMessage(messaging, (payload) => {
            setPayload(payload);
            setTimeout(()=>{
                setPayload(null);
            },5000)

            const notificationTitle = payload.notification?.title || 'Notification';
            const notificationOptions = {
                body: payload.notification?.body,
                icon: '/logo.png', // Ensure this path is correct
            };

            if (notificationPermissionStatus === 'granted') {
                new Notification(notificationTitle, notificationOptions);
            }
        });

        return () => unsubscribe();
    }, [notificationPermissionStatus]);

    useEffect(() => {
        import("../public/assets/js/popupScript");
    }, []);

    return (
        <>
            {!loading ? (
                <Provider store={store}>
                    <SocketProvider>
                        <Component {...pageProps} />
                        {payload && (
                            <div className="fixed bg-white shadow-lg top-2 right-2 w-96 text-white p-4 z-50 rounded-lg">
                                <div className="flex flex-col gap-1">
                                    <div className="flex justify-between items-center">
                                        <h4 className='font-extrabold'>{payload.notification?.title}</h4>
                                        <div onClick={() => setPayload(null)} className="text-red w-5 h-5 flex items-center justify-center rounded-full cursor-pointer">
                                            <FontAwesomeIcon className="text-base text-gray-600 w-3" icon="fa-solid fa-x" />
                                        </div>
                                    </div>
                                    <p className='text-slate-500'>{payload.notification?.body}</p>
                                </div>
                            </div>
                        )}
                        <ToastContainer />
                    </SocketProvider>
                </Provider>
            ) : (
                <Preloader />
            )}
        </>
    );
}

export default MyApp;
