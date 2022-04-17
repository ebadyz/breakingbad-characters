const baseURL = "https://www.breakingbadapi.com/api/";

const callAPI = async (method, baseURL, url) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  try {
    console.log(method, baseURL, url);
    const response = await fetch(`${baseURL}${url}`, { method, headers });
    return Promise.resolve(response.json());
  } catch (error) {
    return Promise.reject(error);
  }
};

const service = {
  getCharacters() {
    return callAPI("GET", baseURL, "characters");
  },
  getQoutes(name) {
    return callAPI("GET", baseURL, `quote/random?autho%20r=${name}`);
  },
};

export default service;
