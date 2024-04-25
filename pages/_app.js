import { useEffect, useState } from "react";
// import "react-input-range/lib/css/index.css";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
// import "slick-carousel/slick/slick-theme.css";
// import "slick-carousel/slick/slick.css";
import "react-responsive-modal/styles.css";
// import WOW from 'wowjs';
// Swiper Slider
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
import '../util/i18n'

// const HomeCSS = dynamic(() => import('../public/assets/css/home.css'));
// const MoodBoardsCSS = dynamic(() => import('../public/assets/css/mood_boards.css'));
// const ProfileCSS = dynamic(() => import('../public/assets/css/profile.css'));

    
function MyApp({ Component, pageProps }) {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // setLoading(true);
        setTimeout(() => {
            setLoading(false);
            import("../public/assets/js/popupScript")
        }, 1000);

        // new WOW.WOW({
        //     live: false
        //   }).init()
    }, []);

//     try {
        
//     switch (location.pathname.slice(1)) {
//         case "":
//             import('../public/assets/css/home.css');
//             break;
//         case 'saved':
//             import('../public/assets/css/mood_boards.css');
//             break;
//         case 'profile':
//             import('../public/assets/css/profile.css');
//             break;
//         case 'dashboard':
//             import('../public/assets/css/dashboard.css');
//             break;
//         default:
    
//     }
// }catch{
    
// }

    return (
        <>
            {!loading ? (
                <Provider store={store}>
                        <Component {...pageProps} />
                        <ToastContainer />
                </Provider>
            ) : (
                <Preloader />
            )}
        </>
    );
}

export default MyApp;
