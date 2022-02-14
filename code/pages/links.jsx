import React, { useEffect, useState } from "react";
import CSS from './links.module.scss';
import fetch from 'isomorphic-unfetch';
import Layout from '../commons/layout';
import config from '../config';
import { connect } from 'react-redux';
import lan from '../i18n/languagefn.js';
import { useRouter } from 'next/router'


function Links(props) {
  const router = useRouter();
  const { locale, locales, defaultLocale } = router;
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
    <Layout
      module="/links"
      title={lan(locale, { zh: `小伙伴 - 朱文龙的自留地`, en: `Friends - Hi! I am Mofei!` })}
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
  const list = await fetch(`${config.dbHost}/api/links/getlist`)
    .then(r => r.json());
  return { props: { list: list.list } }
};

function stateToProps(state) {
  const lan = state.lan;
  return { lan }
}

export default Links// connect(stateToProps, null)(Links);