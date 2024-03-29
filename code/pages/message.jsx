import React, { useEffect, useState } from "react";
import CSS from './message.module.scss';
import Message from '../commons/message.jsx';
import fetch from 'isomorphic-unfetch';
import Lan from '../i18n/languageMap.jsx';
import Layout from '../commons/layout';
import config from '../config';
import Cookie from 'js-cookie';

const id = '000000000000000000000000';

function MessagePage(props) {

  const [github, setGithub] = useState({})


  useEffect(() => {
    let githubInfo;
    try {
      githubInfo = JSON.parse(Cookie.get('github-info'))
    } catch (e) { }

    if (githubInfo) {
      setGithub(githubInfo)
    } else {
      // const githubInfo = Cookie.get('github-info')
      fetch(`https://api.github.com/users/zmofei`)
        .then(r => r.json())
        .then(res => {
          const { followers, following, public_repos } = res
          const githubInfo = { followers, following, public_repos }
          Cookie.set('github-info', JSON.stringify(githubInfo), { expires: 1 })
          setGithub(githubInfo)
        });
    }

  }, []);

  function getMessage() {
    return (
      <Layout
        module="/message"
      >
        <div className={CSS.box}>
          <div className={CSS.boxContent}>
            <div className={CSS.innderBox}>
              <div className={CSS.messageBody}>
                <div className={CSS.messageBox}>
                  <Message id={id} initialData={{
                    list: props.list,
                    page: props.page
                  }} />
                </div>
              </div>
              <div className={`${CSS["message-info"]}`}>
                <div className={`${CSS["message-github"]}`}>
                  <div className={`${CSS["title"]}`}>
                    <svg className={`${CSS["octicon octicon-mark-github"]}`} aria-hidden="true" height="32" version="1.1" viewBox="0 0 16 16" width="32">
                      <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                    </svg>
                    <span><Lan en="My GitHub" zh="我的Github" /></span>
                    <a rel="noopener noreferrer" href="https://github.com/zmofei" target="_blank">
                      <Lan en="Follow" zh="关注" />
                    </a>
                  </div>
                  <div className={`${CSS["content"]}`}>
                    <a rel="noopener noreferrer" className={`${CSS["follow"]}`} href="https://github.com/zmofei?tab=followers" target="_blank">
                      <span className={`${CSS["number"]}`} id="gitFollower">
                        {
                          github && github.followers ? github.followers : <span className={CSS.placeholder}></span>
                        }
                      </span>
                      <span>
                        <Lan en="Followers" zh="粉丝" />
                      </span>
                    </a>
                    <a rel="noopener noreferrer" className={`${CSS["follow"]}`} href="https://github.com/zmofei?tab=repositories" target="_blank">
                      <span className={`${CSS["number"]}`} id="gitRepos">
                        {github && github.following ? github.following : <span className={CSS.placeholder}></span>}
                      </span>
                      <span><Lan en="Repos" zh="公开项目" /></span>
                    </a>
                    <a rel="noopener noreferrer" className={`${CSS["follow"]}`} href="https://github.com/zmofei?tab=following" target="_blank">
                      <span className={`${CSS["number"]}`} id="gitFollowing">
                        {github && github.public_repos ? github.public_repos : <span className={CSS.placeholder}></span>}
                      </span>
                      <span><Lan en="Following" zh="关注" /> </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
  return getMessage();
}

export async function getServerSideProps(ctx) {
  const page = ctx.query.page || 1;
  const message = await fetch(`${config.dbHost}/api/blog/messagelist?id=${id}&pageNumber=20&page=${page}`)
    .then(r => r.json());
  return { props: message }
};


export default MessagePage;