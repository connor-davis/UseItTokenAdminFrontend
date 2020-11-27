import React from "react";

import "../styles/global.scss";
import "../styles/not.found.scss";

function NotFound({history}) {
    return (
        <div className="not-found-page">
            <div className="not-found-card">
                <div className="not-found-title">404</div>
                <div className="not-found-subtitle">The page you were looking for was not found</div>
                <button onClick={history.goBack.bind(this)}>Go Back</button>
            </div>
        </div>
    );
}

export default NotFound;