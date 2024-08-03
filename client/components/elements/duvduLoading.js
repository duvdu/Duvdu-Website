import { connect } from "react-redux";

const DuvduLoading = ({ loadingIn, api, test = false }) => {
    console.log((api?.loading && api?.req == loadingIn))
    return (

        // <img className={ + "load  transition duration-500 ease-in-out"} src="/assets/imgs/loading.gif" alt="loading" />
        <div className={((api?.loading && api?.req == loadingIn || test) ? "w-10 h-10" : "w-0 h-0") + "p-2 animate-spin aspect-square border-t-2 border-primary rounded-full m-2 mx-auto"} />
    );
};

const mapStateToProps = (state) => ({
    api: state.api,

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(DuvduLoading);