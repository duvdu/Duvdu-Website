import { Popup } from "react-leaflet";
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    TelegramShareButton,
    FacebookMessengerShareButton,
    GabShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PocketShareButton,
    RedditShareButton,
    TumblrShareButton,
    ViberShareButton,
    VKShareButton,
    WorkplaceShareButton,
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
    GabIcon,
    HatenaIcon,
    InstapaperIcon,
    LineIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PocketIcon,
    RedditIcon,
    TumblrIcon,
    ViberIcon,
    VKIcon,
    WeiboIcon,
    WorkplaceIcon,
    XIcon
} from "react-share";

const Share = () => {
    const size = 45;
    const shareUrl = 'https://example.com';
    const title = 'Example Title';
    return (
        <div id="Share" className="popup z-30 ">
            <div data-popup-dismiss="popup" className="flex overlay blur" ></div>
            <div className='card content overflow-hidden bg-[#F7F9FB] dark:bg-[#131313] mx-10 bg-no-repeat relative'>

                <div className="flex bg-white m-6 gap-3">
                    <EmailShareButton url={shareUrl}>
                        <EmailIcon size={32} round={true} />
                    </EmailShareButton>

                    <TelegramShareButton url={shareUrl}>
                        <TelegramIcon size={32} round={true} />
                    </TelegramShareButton>

                    <WhatsappShareButton url={shareUrl} title={title}>
                        <WhatsappIcon size={32} round={true} />
                    </WhatsappShareButton>

                    <FacebookMessengerShareButton url={shareUrl}>
                        <FacebookMessengerIcon size={32} round={true} />
                    </FacebookMessengerShareButton>

                    <FacebookShareButton url={shareUrl} quote={title}>
                        <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>

                    <TwitterShareButton url={shareUrl} title={title}>
                        <TwitterIcon size={32} round={true} />
                    </TwitterShareButton>

                    <LinkedinShareButton url={shareUrl} title={title}>
                        <LinkedinIcon size={32} round={true} />
                    </LinkedinShareButton>


                    <PinterestShareButton url={shareUrl}>
                        <PinterestIcon size={32} round={true} />
                    </PinterestShareButton>

                    <RedditShareButton url={shareUrl}>
                        <RedditIcon size={32} round={true} />
                    </RedditShareButton>



                </div>

            </div>
        </div>

    );
};


export default Share;