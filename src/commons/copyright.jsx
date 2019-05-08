import React from "react";
import CSS from './copyright.module.scss';

function CopyRight(props) {
    return (
        <div className={`${CSS.copyright} ${props.className}`}>
            <div>
                <span>(C) 2010-2019 Code & Design by </span>
                <a href="https://github.com/zmofei/" target="_blank" rel="noopener noreferrer" >Mofei</a>
                <div>
                    <span> Powered by </span>
                    <a href="https://github.com/zmofei/dufing" target="_blank" rel="noopener noreferrer" >Dufing</a> (2010-2019) & Express
                </div>
            </div>
        </div>
    )
}

export default CopyRight;