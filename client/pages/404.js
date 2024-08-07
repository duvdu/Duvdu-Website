import Layout from "../components/layout/Layout";
import Link from "next/link"
import { useTranslation } from 'react-i18next';

function Custom404() {
    const { t } = useTranslation();
    return (
        <>
            <Layout
                parent="Home"
                sub="Pages"
                subChild="404"

            >
                <main className="main page-404">
                    <div className="h-body center-div pt-150 pb-150">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-8 col-lg-10 col-md-12 m-auto text-center">
                                    <p className="mb-20">
                                        <img
                                            src="assets/imgs/page/page-404.png"
                                            alt=""
                                            className="hover-up"
                                        />
                                    </p>
                                    <h1 className="display-2 mb-30">{t("Page Not Found")}</h1>
                                    <p className="font-lg text-grey-700 mb-30">
                                        The link you clicked may be broken or
                                        the page may have been removed.
                                        <br />
                                        visit the{" "}
                                        <Link href="/">
                                            <span className="text-primary cursor-pointer">
                                                {" "}Homepage
                                            </span>
                                        </Link>
                                        {" "}or{" "}
                                        <Link href="/page-contact">
                                            <span className="text-primary cursor-pointer">
                                                Contact us{" "}
                                            </span>
                                        </Link>{t("about the problem")}</p>

                                    <Link href="/">
                                        <span className="text-primary cursor-pointer">
                                            <i className="mr-5"></i>
                                            Back To Home Page
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </Layout>
        </>
    );
}

export default Custom404;
