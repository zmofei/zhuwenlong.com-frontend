const API_URL = 'https://www.mofei.life/api';



export async function fetchBlogContent(blog_id = '', lang = 'en') {
    const URL = `${API_URL}/blog/article/${blog_id}?lang=${lang}`;
    const response = await fetch(URL, {
        next: { revalidate: 10 },
    })
    return response.json();
}


export async function fetchBlogList(page = 1, lang = 'en') {
    const URL = `${API_URL}/blog/list/${page}?lang=${lang}`;
    const response = await fetch(URL, {
        next: { revalidate: 10 },
    })
    return response.json();
}
