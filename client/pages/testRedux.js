import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from "../redux/action/test";
import { useTranslation } from 'react-i18next';

const mapStateToProps = (state) => {
    const { t } = useTranslation();
    return {
        count: state.counter.count
    };
};

const ConnectedButton1 = connect(null, { increment })(Button1);
const ConnectedButton2 = connect(null, { decrement })(Button2);
const ConnectedShow = connect(mapStateToProps)(Show);

// Define Show component
function Show({ count }) {
    return <h2>Counter: {count}</h2>;
}

// Connect Show component to Redux store

// Define Button1 component
function Button1({ increment }) {
    const { t } = useTranslation();
    return <button onClick={increment}>{t("Increment")}</button>;
}

// Define Button2 component
function Button2({ decrement }) {
    const { t } = useTranslation();
    return <button onClick={decrement}>{t("Decrement")}</button>;
}

const Counter = () => {
    return (
        <div>
            <ConnectedShow />
            <div className='flex flex-col'>
                <ConnectedButton1 />
                <ConnectedButton2 />
            </div>
        </div>
    );
};

// Connect Counter component to Redux store
export default Counter;
