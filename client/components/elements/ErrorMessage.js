
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function ErrorMessage({ErrorMsg}) {
    const { t } = useTranslation();
    return (
        <>
        {ErrorMsg && <div className="text-rose-700 text-base mt-2">{t(ErrorMsg)}</div>}
        </>
    );
}

export default ErrorMessage;
