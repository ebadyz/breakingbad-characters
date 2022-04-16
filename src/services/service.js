const baseURL = "https://www.breakingbadapi.com/api/";

const callAPI = async (request, method, baseURL, url) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  try {
    const response = await request(`${baseURL}${url}`, { method, headers });
    return Promise.resolve(response.json());
  } catch (error) {
    return Promise.reject(error);
  }
};

const service = {
  get: (url) => callAPI(fetch, "GET", baseURL, url),
};

export default service;
