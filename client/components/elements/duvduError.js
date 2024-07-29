import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { errorConvertedMessage } from "../../util/util";

const DuvduError = ({ api, req }) => {
    const [errorMsg, setErrorMsg] = useState(null);
    useEffect(() => {
        if (api.error && api.req == req) {
            setErrorMsg(errorConvertedMessage(api.error));
        }
    }, [api.error]);
    
    return (
        errorMsg &&
        <span dangerouslySetInnerHTML={{ __html: errorMsg }} />
    );
};

const mapStateToProps = (state) => ({
    api: state.api,

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(DuvduError);