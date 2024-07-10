import { connect } from "react-redux";

const Loading = ({ loadingIn , api }) => {
    
    return (
        <img className={(api?.loading && api?.req == loadingIn ? "w-10 h-10" : "w-0 h-0") + "load mx-auto transition duration-500 ease-in-out"} src="/assets/imgs/loading.gif" alt="loading" />
    );
};

const mapStateToProps = (state) => ({
    api: state.api,

});

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);