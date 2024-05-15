import Layout from "../components/layout/Layout";
import Link from "next/link"
function Custom404() {
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
                                    <h1 className="display-2 mb-30">
                                        Page Not Found
                                    </h1>
                                    <p className="font-lg text-grey-700 mb-30">
                                        The link you clicked may be broken or
                                        the page may have been removed.
                                        <br />
                                        visit the{" "}
                                        <Link href="/"><a>
                                            {" "}
                                            <span> Homepage</span>
                                        </a></Link>
                                        or{" "}
                                        <Link href="/page-contact"><a>
                                            <span>Contact us</span>
                                        </a></Link>
                                        about the problem
                                    </p>

                                    <Link href="/"><a className=" ">
                                        <i className="mr-5"></i>
                                        Back To Home Page
                                    </a>
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
