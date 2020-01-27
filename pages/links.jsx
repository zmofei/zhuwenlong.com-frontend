import React, { useEffect, useState } from "react";
import CSS from './links.module.scss';
import axios from 'axios';
import Layout from '../commons/layout';
import config from '../config';

function Links(props) {
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
          href={`/api/jump?url=${url}&module=links&id=${info._id}&type=visited`}
          target="_blank"
        >
          <img src={info.cover} alt="cover" />
        </a>
        <div className={`${CSS["lab-block-content"]}`}>
          <div className={`${CSS["lab-block-title"]}`}>
            <a
              href={`/api/jump?url=${url}&module=links&id=${info._id}&type=visited`}
              target="_blank"
            >
              {info.title}
            </a>
          </div>
          <div className={`${CSS["lab-block-intro"]}`}>{info.intro}</div>
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

Links.getInitialProps = async (ctx) => {
  const list = await axios.get(`${config.dbHost}/api/links/getlist`);
  return { list: list.data.list }
};



export default Links;