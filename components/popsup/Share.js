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

const Share = () => {
    const size = 45;
    const shareUrl = 'https://example.com';
    const title = 'Example Title';
    return (
        <div id="Share" className="popup z-30 ">
            <div data-popup-dismiss="popup" className="flex overlay blur" ></div>
            <div className='card z-[2] overflow-hidden bg-[#F7F9FB] dark:bg-[#131313] mx-10 bg-no-repeat relative'>
                <div className="m-6">
                    <h1 className="my-6 text-xl">
                        share via
                    </h1>

                    <div className="grid grid-cols-3 bg-white gap-5">
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
            </div>
        </div>

    );
};


export default Share;