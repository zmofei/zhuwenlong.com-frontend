var RSS = require('rss');

export async function GET(request: Request,
    { params }: { params: Promise<{ lang: string }> }) {

    const lang = (await params).lang

    const URL = `https://api.mofei.life/api/blog/list/1?lang=${lang}&pagesize=20&withHTML=1`;
    const blogsRst = await fetch(URL)
    const blogs = await blogsRst.json()


    const feedOptions = {
        title: lang === 'zh' ? '你好我是Mofei' : 'Hi! I am Mofei!',
        description: `Mofei Zhu, a software engineer from China, sharing life and work experiences in Finland, exploring tech, family, and cultural adventures. ${lang == 'zh' ? "feedId:99544572437916672+userId:73749889001453568" : "feedId:99543735457776640+userId:73749889001453568"}  `,
        feed_url: `https://www.mofei.life/${lang}/rss`,
        site_url: `https://www.mofei.life/${lang}/`,
        image_url: 'https://www.mofei.life/img/mofei-logo_500_500.svg',
        docs: 'https://cyber.harvard.edu/rss/rss.html',
        managingEditor: `hi@mofei.life (${lang === 'zh' ? '朱文龙' : 'Mofei Zhu'})`,
        webMaster: `hi@mofei.life (${lang === 'zh' ? '朱文龙' : 'Mofei Zhu'})`,
        language: lang,
        lastBuildDate: new Date().toUTCString(),
    }

    const feed = new RSS(feedOptions);

    blogs.list.forEach((blog: any) => {
        feed.item({
            title: blog.title,
            description: blog.html,
            url: `https://www.mofei.life/${lang}/blog/article/${blog._id}`,
            guid: blog.id,
            author: lang === 'zh' ? '朱文龙' : 'Mofei Zhu',
            date: new Date(blog.pubtime).toUTCString(),
            enclosure: {
                url: blog.cover,
            },
        })
    });

    // Response.headers.append("content-type", "text/xml");

    return new Response(feed.xml({ indent: true }),
        {
            headers: {
                'Content-Type': 'text/xml',
            },
        })
}