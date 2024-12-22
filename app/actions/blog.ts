const API_URL = '/api';

export async function fetchBlogList(page = 1, lang = 'en') {
    const URL = `${API_URL}/blog/list/${page}?lang=${lang}`;
    const res = await fetch(URL)
    if (!res.ok) {
        throw new Error('Failed to fetch user');
    }
    return res.json();
}


export async function fetchBlogContent(id = '', lang = 'en') {
    const URL = `${API_URL}/blog/article/${id}?lang=${lang}`;
    const res = await fetch(URL)
    if (!res.ok) {
        throw new Error('Failed to fetch user');
    }
    return res.json();
}

export async function fetchMessageList(id: string, page = 1, itemsPerPage = 10) {
    const URL = `${API_URL}/blog/comment/list/${id}/${page}?itemsPerPage=${itemsPerPage}`;
    const res = await fetch(URL)
    if (!res.ok) {
        throw new Error('Failed to fetch user');
    }
    return res.json();
}

export async function getToken() {
    const URL = `${API_URL}/user/anonymous/token`;
    const res = await fetch(URL)
    if (!res.ok) {
        console.error('Failed to fetch token');
    }
}

export async function postMessage(id: string, data: any) {
    const URL = `${API_URL}/blog/anonymous/comment/add/${id}`;
    const res = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (!res.ok) {
        throw new Error('Failed to post message');
    }
    return res.json();
}