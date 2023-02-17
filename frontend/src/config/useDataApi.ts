const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

interface Props {
  path: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
  headers?: any;
  concatUrl?: string;
}

interface Response<T> {
  ok: boolean;
  data: Promise<T> | null;
  status?: number;
  msg?: string | object;
}

/**
 * Hook to monitor the status of requests
 * @param {string} path URL
 * @param {'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'} [method] Method of request
 * @param {object} body Body of request
 * @param {object} headers Headers of request
 */
export const requestApi = <T>(props: Props): Promise<Response<T>> => {
  const {
    path = "",
    method = "GET",
    body = {},
    headers = {},
    concatUrl,
  } = props;

  const url = concatUrl ? `${path}/${concatUrl}` : path;

  return new Promise((resolve, reject) => {
    fetch(url, {
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
            resolve({ ok: ok, data: json, status: status, msg: json?.message });
          })
          .catch(() => resolve({ ok: ok, data: null, status: status }));
      })
      .catch((e) => {
        console.error("||* ==> Error requestApi <== *||", e);
        resolve({ ok: false, data: null });
      });
  });
};
