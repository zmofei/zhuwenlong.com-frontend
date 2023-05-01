import styles from './copyright.module.scss';
import lan from '../i18n/languagefn.js';
import { connect } from 'react-redux';

function CopyRight(props) {
    return (
        <div className={`${styles.copyright} ${props.className}`}>
            <div>
                <span>(C) 2010-2023 Code & Design by </span>
                <a href="https://github.com/zmofei/" target="_blank" rel="noopener noreferrer" >Mofei</a>
                <div>
                    <span> Powered by </span>
                    <a href="https://github.com/zmofei/dufing" target="_blank" rel="noopener noreferrer" >Dufing</a> (2010-2020) & Express
                </div>
                <div>
                    IPC证：<a href="http://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer" >沪ICP备2022019571号-{lan(props.lan, {
                        'zh': "1", 'en': '2'
                    })}</a>
                </div>
            </div>
        </div>
    )
}

function stateToProps(state) {
    const lan = state.lan;
    return { lan }
}

export default connect(stateToProps, null)(CopyRight);