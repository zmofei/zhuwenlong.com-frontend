const API_URL = "https://api.mofei.life/api";

export async function fetchBlogContent(blog_id = "", lang = "en") {
  const URL = `${API_URL}/blog/article/${blog_id}?lang=${lang}`;
  const response = await fetch(URL, {
    next: { revalidate: 10 },
  });
  return response.json();
}

export async function fetchBlogRecommend(blog_id = "", lang = "en") {
  try {
    const URL = `${API_URL}/blog/recommend/${blog_id}?lang=${lang}`;
    const response = await fetch(URL, {
      next: { revalidate: 3600 * 24 },
    });
    return response.json();
  } catch (error) {
    console.error("Failed to fetch recommends:", error);
    return [];
  }
}

export async function fetchBlogList(page = 1, lang = "en") {
  const URL = `${API_URL}/blog/list/${page}?lang=${lang}`;
  const response = await fetch(URL, {
    next: { revalidate: 10 },
  });
  return response.json();
}
