const defaultHeaders = {
  // Accept: "application/json",
  // "Content-Type": "application/json",
  // "Access-Control-Allow-Origin": "*",
};

interface Props {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: any;
}

interface Response<T> {
  ok: boolean;
  data: Promise<T> | null;
  status?: number;
}

/**
 * Hook to monitor the status of requests
 * @param {string} path URL
 * @param {'GET' | 'POST' | 'PUT' | 'DELETE'} [method] Method of request
 * @param {object} body Body of request
 * @param {object} headers Headers of request
 */
export const requestApi = <T>(props: Props): Promise<Response<T>> => {
  const { path = "", method = "GET", body = {}, headers = {} } = props;

  return new Promise((resolve, reject) => {
    fetch(path, {
      method: method,
      headers: { ...defaultHeaders, ...headers },
      body: Object.keys(body).length ? JSON.stringify({ ...body }) : null,
    })
      .then((response) => {
        const status = response?.status;
        const ok = response?.ok || false;

        response
          .json()
          .then((json) => {
            resolve({ ok: ok, data: json, status: status });
          })
          .catch(() => resolve({ ok: ok, data: null, status: status }));
      })
      .catch((e) => {
        console.error("||* ==> Error requestApi <== *||", e);
        resolve({ ok: false, data: null });
      });
  });
};
