import Layout from "../components/layout/Layout";
const data = [
    {
        img1: '/assets/imgs/projects/1.jpeg',
        img2: '/assets/imgs/projects/2.jpeg',
        img3: '/assets/imgs/projects/3.jpeg',
        projectsNum: '37',
        name: 'favorites',
    },
    {
        img1: '/assets/imgs/projects/4.jpeg',
        img2: '/assets/imgs/projects/5.jpeg',
        img3: '/assets/imgs/projects/6.jpeg',
        projectsNum: '564',
        name: 'new shoot inspiration',
    },
    {
        img1: '/assets/imgs/projects/7.jpeg',
        img2: '/assets/imgs/projects/8.jpeg',
        img3: '/assets/imgs/projects/9.jpeg',
        projectsNum: '546',
        name: 'mood board for our project',
    },

];
const Boards = ({ data }) => {
    const { img1, img2, img3, projectsNum, name, favorite } = data;

    return (
        <div className="boards-card">
            <div className="projects">
                <div className="col1 img-cart-style" style={{ backgroundImage: `url(${img1})` }}></div>
                <div className="col2">
                    <div className="row1 img-cart-style" style={{ backgroundImage: `url(${img2})` }}></div>
                    <div className="row2 img-cart-style" style={{ backgroundImage: `url(${img3})` }}></div>
                </div>
            </div>
            <div className="boards-info projects-num">{projectsNum} projects</div>
            <div className="boards-info projects-name flex">
                {name == "favorites" && <img src='/assets/imgs/theme/icons/favorites.svg' alt="favorites" />}
                {name}
            </div>
        </div>
    );

};

const Saved = () => {


    return (
        <>
            <Layout >
                <section className="mt-12 mb-12">
                    <div className="container mb-7">
                        <div className="flex alignCenter mb-7">
                            <h1 className="mood-boards-header">mood boards</h1>
                            <div className="mr-6"></div>
                            <div className="new_board">
                                new board
                                <img src="/assets/imgs/theme/icons/+.svg" alt="star"/>
                            </div>
                        </div>
                        {false && (
                            <h3>No saved Found </h3>
                        )}
                        <div className="boards-grid">
                            {
                                data.map((feature, index) => (
                                    <Boards key={index} data={feature} />
                                ))
                            }
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default Saved;
