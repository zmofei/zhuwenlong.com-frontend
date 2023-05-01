import CSS from './related_article.module.scss';
import { useEffect, useState } from 'react';
import config from '../config';
import Link from 'next/link';
import Lan from '../i18n/languageMap.jsx';

function RelatedArticle(props) {

    const [relatedArticles, setRelatedArticles] = useState([]);
    const [listEmoji, setListEmoji] = useState([]);

    useEffect(() => {
        fetch(`${config.dbHost}/api/blog/related_article/${props.blogid}`)
            .then(r => r.json())
            .then(res => {
                setRelatedArticles(res.data)
            });

        const likeEmojis = ["'🎠'", "'🚏'", "'🏖'", "'🏝'", "'🚀'", "'🚗'", "'🚕'", "'🚙'", "'🚌'", "'🚎'", "'🏎'", "'🚓'", "'🚑'", "'🚒'", "'🚐'", "'🛻'", "'🚚'", "'🚛'"]
        const likeEmoji = likeEmojis[Math.floor(Math.random() * likeEmojis.length)]
        setListEmoji(likeEmoji)
    }, [props.blogid])


    return relatedArticles.length > 0 &&
    (<div className={CSS['related_article']}>
        <div className={CSS['title']}>
            <Lan en="Related Articles" zh="相关文章" />
        </div>
        <ul>
            {relatedArticles.map((item, index) => {
                return (
                    <li
                        style={{
                            'listStyleType': `${listEmoji}`
                        }}
                        key={item._id}>
                        <Link href={`/blog/article/${item._id}`}>

                            <Lan en={item['title-en'] || item.title} zh={item.title} />

                        </Link>
                    </li>
                );
            })}
        </ul>
    </div>);
}

export default RelatedArticle;