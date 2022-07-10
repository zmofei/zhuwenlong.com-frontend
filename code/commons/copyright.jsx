import styles from './copyright.module.scss';

function CopyRight(props) {
    return (
        <div className={`${styles.copyright} ${props.className}`}>
            <div>
                <span>(C) 2010-2022 Code & Design by </span>
                <a href="https://github.com/zmofei/" target="_blank" rel="noopener noreferrer" >Mofei</a>
                <div>
                    <span> Powered by </span>
                    <a href="https://github.com/zmofei/dufing" target="_blank" rel="noopener noreferrer" >Dufing</a> (2010-2020) & Express
                </div>
                <div>
                    IPC证：<a href="http://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer" >沪ICP备19009767号-1</a>
                </div>
            </div>
        </div>
    )
}

export default CopyRight;