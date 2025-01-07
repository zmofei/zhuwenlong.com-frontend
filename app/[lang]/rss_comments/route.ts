var RSS = require('rss');

export async function GET(request: Request,
    { params }: { params: Promise<{ lang: string }> }) {

    const lang = (await params).lang

    const URL = `https://www.mofei.life/api/blog/comment/list/0/1?itemsPerPage=20`;
    const blogsRst = await fetch(URL)
    const blogs = await blogsRst.json()


    const feedOptions = {
        title: lang === 'zh' ? '你好我是Mofei' : 'Hi! I am Mofei!',
        description: "Mofei Zhu, a software engineer from China, sharing life and work experiences in Finland, exploring tech, family, and cultural adventures.",
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

    blogs.data.forEach((blog: any) => {
        console.log(blog)
        feed.item({
            title: `${blog.name}'s comment`,
            description: `<![CDATA[${blog.content}]]>`,
            url: blog.blogId === '000000000000000000000000' ? `https://www.mofei.life/${lang}/message` : `https://www.mofei.life/${lang}/blog/article/${blog.blogId}`,
            guid: blog.id,
            author: `${blog.name} (${blog.blog})`,
            date: new Date(blog.time).toUTCString()
        })
    });

    return Response.json(feed)
}