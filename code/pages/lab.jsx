import React, { } from "react";
import CSS from './lab.module.scss';
import fetch from 'isomorphic-unfetch';
import Lan from '../i18n/languageMap.jsx';
import lan from '../i18n/languagefn.js';
import Layout from '../commons/layout';
import { connect } from 'react-redux';

import config from '../config';


function Lab(props) {

  const list = props.list;

  function getAddone() {
    const html = [];
    if (list.length > 0) {
      for (let i = 0; i < list.length; i += 1) {
        html.push(getList(list[i]))
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
          className={`${CSS["lab-block-title"]}`}
          href={`/api/jump?url=${url}&module=lab&id=${info._id}&type=visited`}
          target="_blank"
        >
          <img src={info.cover} alt="cover" />
        </a>
        <div className={`${CSS["lab-block-content"]}`}>
          <div className={`${CSS["lab-block-title"]}`}>
            <a
              href={`/api/jump?url=${url}&module=lab&id=${info._id}&type=visited`}
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
    <Layout
      module="/lab"
      title={lan(props.lan, { zh: `实验室 - 朱文龙的自留地`, en: `Labs - Hi! I am Mofei!` })}
    >
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

export async function getServerSideProps(ctx) {
  const list = await fetch(`${config.dbHost}/api/lib/getlist`)
    .then(r => r.json());
  return { props: { list: list.list } }
};

function stateToProps(state) {
  const lan = state.lan;
  return { lan }
}

export default connect(stateToProps, null)(Lab);