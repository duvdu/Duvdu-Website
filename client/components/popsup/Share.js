import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    TelegramShareButton,
    FacebookMessengerShareButton,
    RedditShareButton,
} from "react-share";

import {
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    LinkedinIcon,
    PinterestIcon,
    TelegramIcon,
    WhatsappIcon,
    TwitterIcon,
    RedditIcon,
    XIcon
} from "react-share";
import Popup from "../elements/popup";
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Share = ({ url, title }) => {
    const { t } = useTranslation();
    const size = 45;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(url);
        toast.success(t("Link copied to clipboard!"));
    };

    return (
        <Popup id='Share'>
            <div className="m-6">
                <h1 className="my-6 text-xl">{t("share via")}</h1>

                <div className="grid grid-cols-3 gap-5">
                    <EmailShareButton url={url}>
                        <EmailIcon size={size} round={true} />
                    </EmailShareButton>

                    <TelegramShareButton url={url}>
                        <TelegramIcon size={size} round={true} />
                    </TelegramShareButton>

                    <WhatsappShareButton url={url} title={title}>
                        <WhatsappIcon size={size} round={true} />
                    </WhatsappShareButton>

                    <FacebookMessengerShareButton url={url}>
                        <FacebookMessengerIcon size={size} round={true} />
                    </FacebookMessengerShareButton>

                    <FacebookShareButton url={url} quote={title}>
                        <FacebookIcon size={size} round={true} />
                    </FacebookShareButton>

                    <TwitterShareButton url={url} title={title}>
                        <XIcon size={size} round={true} />
                    </TwitterShareButton>

                    <LinkedinShareButton url={url} title={title}>
                        <LinkedinIcon size={size} round={true} />
                    </LinkedinShareButton>

                    <PinterestShareButton url={url}>
                        <PinterestIcon size={size} round={true} />
                    </PinterestShareButton>

                    <RedditShareButton url={url}>
                        <RedditIcon size={size} round={true} />
                    </RedditShareButton>
                </div>

                <div className="my-6 flex">
                    <input 
                        type="text" 
                        value={url} 
                        readOnly 
                        className="w-full p-2 border rounded bg-gray-100 text-gray-700"
                    />
                    <button 
                        onClick={handleCopyLink} 
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 whitespace-nowrap">
                        {t("copy")}
                    </button>
                </div>

                <ToastContainer />
            </div>
        </Popup>
    );
};

export default Share;
