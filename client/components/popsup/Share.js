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

const Share = ({ url, title }) => {
    const size = 45;
    // console.log(url)
    const shareUrl = url//'https://example.com';
    return (
        <Popup id='Share' >

            <div className="m-6">
                <h1 className="my-6 text-xl">
                    share via
                </h1>

                <div className="grid grid-cols-3 gap-5">
                    <EmailShareButton url={shareUrl}>
                        <EmailIcon size={size} round={true} />
                    </EmailShareButton>

                    <TelegramShareButton url={shareUrl}>
                        <TelegramIcon size={size} round={true} />
                    </TelegramShareButton>

                    <WhatsappShareButton url={shareUrl} title={title}>
                        <WhatsappIcon size={size} round={true} />
                    </WhatsappShareButton>

                    <FacebookMessengerShareButton url={shareUrl}>
                        <FacebookMessengerIcon size={size} round={true} />
                    </FacebookMessengerShareButton>

                    <FacebookShareButton url={shareUrl} quote={title}>
                        <FacebookIcon size={size} round={true} />
                    </FacebookShareButton>

                    <TwitterShareButton url={shareUrl} title={title}>
                        <XIcon size={size} round={true} />
                    </TwitterShareButton>

                    <LinkedinShareButton url={shareUrl} title={title}>
                        <LinkedinIcon size={size} round={true} />
                    </LinkedinShareButton>


                    <PinterestShareButton url={shareUrl}>
                        <PinterestIcon size={size} round={true} />
                    </PinterestShareButton>

                    <RedditShareButton url={shareUrl}>
                        <RedditIcon size={size} round={true} />
                    </RedditShareButton>
                </div>

            </div>
        </Popup>


    );
};


export default Share;