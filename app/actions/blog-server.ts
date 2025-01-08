const API_URL = 'https://www.mofei.life/api';



export async function fetchBlogContent(blog_id = '', lang = 'en') {
    const URL = `${API_URL}/blog/article/${blog_id}?lang=${lang}`;
    const blogRequest = await fetch(URL, {
        cache: 'force-cache',
    })
    return blogRequest.json();
}
