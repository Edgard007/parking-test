//* ==> UseDataApi <== *//
import { requestApi } from "../config/useDataApi";

// ==> Helpers
import { alertNotification } from "../helpers/notifications";

export interface HttpAdapter {
  // get<T>(url: string): Promise<T>;
  // post<T>(url: string): Promise<T>;
}

export class ApiFetchAdapter implements HttpAdapter {
  // async get<T>(url: string): Promise<T> {
  //   try {
  //     const result = await requestApi<T>({
  //       path: url,
  //     });
  //     const { ok, data } = result;
  //     if (ok) {
  //       return new Promise((res, rej) => {
  //         res(data);
  //       });
  //     } else {
  //       return new Promise((res, rej) => {
  //         rej();
  //       });
  //     }
  //   } catch (err) {
  //     console.error("||* ==> Error getParking <== *||", err);
  //     alertNotification({
  //       msm: "Error",
  //       description: "Error al obtener registros",
  //       type: "error",
  //     });
  //     return new Promise((res, rej) => {
  //       rej();
  //     });
  //   }
  // }
}
