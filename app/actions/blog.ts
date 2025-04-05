const NEW_API_URL = "https://api.mofei.life/api";

export async function fetchSiteMap(basicUrl = "https://www.mofei.life") {
  const URL = `${NEW_API_URL}/blog/sitemap`;
  const res = await fetch(URL);
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }
  return res.json();
}

export async function fetchMessageList(
  id: string,
  page = 1,
  itemsPerPage = 10
) {
  const URL = `${NEW_API_URL}/blog/comment/${id}/${page}?itemsPerPage=${itemsPerPage}&lang=en`;
  const res = await fetch(URL);
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }
  return res.json();
}

export async function getToken() {
  const URL = `${NEW_API_URL}/user/anonymous/token`;
  const res = await fetch(URL, {
    credentials: "include",
  });
  if (!res.ok) {
    console.error("Failed to fetch token");
  }
}

export async function postMessage(id: string, data: any) {
  const URL = `${NEW_API_URL}/blog/anonymous/comment/add/${id}`;
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to post message");
  }
  return res.json();
}
