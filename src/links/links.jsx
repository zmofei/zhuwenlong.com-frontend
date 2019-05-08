import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CSS from './links.module.scss';
import axios from 'axios';
// import moment from 'moment';


function Links(props) {

  const [list, setList] = useState([])

  useEffect(() => {
    axios.get(`/api/links/getlist`)
      .then(res => {
        setList(() => {
          return res.data.list;
        })
      })
  }, []);

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
    }
  }

  function getList(info) {
    const url = info.url;
    return (
      <div className={`${CSS["lab-block"]}`} key={info._id}>
        <Link
          to={{
            pathname: `/api/jump`,
            search: `?url=${url}&module=links&id=${info._id}&type=visited`,

          }}
          target="_blank"
        >
          <img src={info.cover} alt="cover" />
        </Link>
        <div className={`${CSS["lab-block-content"]}`}>
          <div className={`${CSS["lab-block-title"]}`}>
            <Link to={{
              pathname: `/api/jump`,
              search: `?url=${url}&module=links&id=${info._id}&type=visited`
            }}
              target="_blank"
            >
              {info.title}
            </Link>
          </div>
          <div className={`${CSS["lab-block-intro"]}`}>{info.intro}</div>
        </div>
      </div >
    )
  }

  return (
    <div className={CSS.labBody}>
      <section className={`${CSS["lab"]}`}>
        <div className={`${CSS["lab-box"]}`}>
          {getAddone()}
        </div>
      </section>
    </div>
  )
}


export default Links;