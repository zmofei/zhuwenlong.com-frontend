import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import CSS from './lab.scss';
import fetch from 'isomorphic-unfetch';
import moment from 'moment';
import Lan from '../i18n/languageMap.jsx';
import Page from '../commons/pageNumber';
import Layout from '../commons/layout';

import config from '../config';


function Lab(props) {

  const list = props.list;

  function getAddone() {
    const html = [];
    const clumNumber = 3;
    if (list.length > 0) {
      for (let i = 0; i < list.length; i += clumNumber) {
        const block = [];
        for (let j = 0; j < clumNumber; j++) {
          list[i + j] &&
            block.push(getList(list[i + j]))
        }
        html.push(
          <div className={`${CSS["lab-block-addone"]}`} key={i}>
            {block}
          </div>
        )
      }
      return html;
    } else {
      const placeHoler = new Array(2).fill(0);
      return (
        <div className={`${CSS["lab-block-addone"]}`}>
          {
            placeHoler.map((v, index) =>
              <div className={`${CSS["lab-block"]} ${CSS['lab-block-placeholder']}`} key={index}>
                <div className={`${CSS.placeholder} ${CSS.placeholderImg}`} ></div>
                <div className={`${CSS["lab-block-content"]}`}>
                  <div className={`${CSS["lab-block-title"]}`}>
                  </div>
                  <div className={`${CSS["lab-block-intro"]}`} />
                  <div className={`${CSS["lab-block-intro"]}`} />
                  <div className={`${CSS["lab-block-intro"]}`} />
                </div>
              </div>
            )
          }
        </div>
      )
    }
  }

  function getList(info) {
    const url = info.url;
    return (
      <div className={`${CSS["lab-block"]}`} key={info._id}>
        <a
          href={`/api/jump?url=${url}&module=lab&id=${info._id}&type=visited`}
          target="_blank"
        >
          <img src={info.cover} alt="cover" />
        </a>
        <div className={`${CSS["lab-block-content"]}`}>
          <div className={`${CSS["lab-block-title"]}`}>
            <a
              herf={`/api/jump?url=${url}&module=lab&id=${info._id}&type=visited`}
              target="_blank"
            >
              <Lan en={info['title-en'] || info['title']} zh={info.title} />
            </a>
          </div>
          <div className={`${CSS["lab-block-intro"]}`}>
            <Lan en={info['intro-en'] || info['intro']} zh={info.intro} />
          </div>
          <div className={`${CSS["lab-block-author"]}`}>
            <Lan en="Author By:" zh="作者" />{info.author.map(a => (
              <a
                key={a.url}
                href={`/api/jump?url=${a.url}`}
                target="_blank"
              >
                {a.name}
              </a>
            ))}
          </div>
        </div>
      </div >
    )
  }

  return (
    <Layout>
      <div className={CSS.labBody}>
        <section className={`${CSS["lab"]}`}>
          <div className={`${CSS["lab-box"]}`}>
            {getAddone()}
          </div>
        </section>
      </div>
    </Layout>
  )
}

Lab.getInitialProps = async (ctx) => {
  const list = await fetch(`${config.dbHost}/api/lib/getlist`)
    .then(r => r.json());
  return { list: list.list }
};

export default Lab;