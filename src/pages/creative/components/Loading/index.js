import './style.scss';
import React from 'react';

export const Loading = (props) => {
const { visible } = props;
const cls = `loading-wrapper ${visible ? 'visible': ''}`;
    return (
        <div className={cls}>
            <div className="wrapper">
                <div className="spin-wave pad">
                    <span className="load-letter">D</span>
                    <span className="load-letter">E</span>
                    <span className="load-letter">Z</span>
                    <span className="load-letter">A</span>
                    <span className="load-letter">I</span>
                    <span className="load-letter">N</span>
                </div>
            </div>
            <div id="loading-content"></div>
        </div>
    )
}