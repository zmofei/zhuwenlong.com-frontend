import React, { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';

import config from '../../config'
const { dbHost } = config

function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/png' });
}

async function retrieveImageFromClipboardAsBlob(pasteEvent, callback) {
    const items = pasteEvent.clipboardData.items;

    for (let i = 0; i < items.length; i++) {
        // Skip content if not image
        if (items[i].type.indexOf("image") == -1) continue;
        // Retrieve image on clipboard as blob
        const blob = items[i].getAsFile();


        var fd = new FormData();
        fd.append('image', blob, 'png');

        fetch(`${dbHost}/api/_admin/upload-image`, {
            method: 'POST',
            body: fd
        })
            .then(res => res.json())
            .then(({ url }) => {
                callback(url)

            })
    }
}

function Admin(props) {
    const ref = useRef({
        urls: []
    });
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        window.addEventListener("paste", (pasteEvent) => {
            retrieveImageFromClipboardAsBlob(pasteEvent, (url) => {
                ref.current.urls = [...ref.current.urls, url];
                setUrls(ref.current.urls)
            })
        }, false);
    }, [])

    return (
        <>
            <h3>粘贴图片以开始</h3>
            <ul>
                {urls.map((item, index) => <li key={index}>
                    <CopyToClipboard text={`https://cdn.zhuwenlong.com${item}`}>
                        <>
                            <span>{item}</span>
                            <a href={`https://cdn.zhuwenlong.com${item}`} target="_blank"> view </a>
                        </>
                    </CopyToClipboard>
                </li>)}
            </ul>
        </>
    )
}


export default Admin;