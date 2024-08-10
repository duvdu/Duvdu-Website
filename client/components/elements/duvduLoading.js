import { connect } from "react-redux";

const DuvduLoading = ({ loadingIn, api, test = false }) => {
    console.log(api)
    return (
        // <img className={ + "load  transition duration-500 ease-in-out"} src="/assets/imgs/loading.gif" alt="loading" />
        <>
        {
            (api?.loading && api?.req == loadingIn || test) &&
            <div className="w-10 h-10 p-2 animate-spin aspect-square border-t-2 border-primary rounded-full m-2 mx-auto" />
        }
        </>
    );
};

const mapStateToProps = (state) => ({
    api: state.api,

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(DuvduLoading);