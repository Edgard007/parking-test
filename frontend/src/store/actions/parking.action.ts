//* ==> UseDataApi <== *//
import { requestApi } from "../../config/useDataApi";

//* ==> Paths <== *//
import { parking } from "../../config/paths";

// ==> Helpers
import { alertNotification } from "../../helpers/notifications";

// ==> Interfaces
import {
  ParkingRequest,
  ParkingResponse,
} from "../../interfaces/parking.interface";

/**
 * Method to obtain list of parking
 */
export const getParking = async () => {
  try {
    const result = await requestApi<ParkingResponse[]>({
      path: parking,
    });
    const { ok, data } = result;
    if (ok) return data || [];
    else {
      alertNotification({
        msm: "Error",
        description: "",
        type: "error",
      });
      return [];
    }
  } catch (e) {
    console.error("||* ==> Error getParking <== *||", e);
    alertNotification({
      msm: "Error",
      description: "Error al obtener registros",
      type: "error",
    });
    return [];
  }
};

/**
 * Method for update a record
 */
export const saveParking = async (body: ParkingRequest) => {
  try {
    const result = await requestApi<ParkingResponse[]>({
      path: parking,
      method: "POST",
      body: body,
    });
    const { ok, msg } = result;
    if (ok) return { ok };
    else return { ok, msg };
  } catch (e) {
    console.error("||* ==> Error <== *||", e);
    alertNotification({
      msm: "Error",
      description: "Error al guardar registro",
      type: "error",
    });
    return { ok: false };
  }
};

/**
 * Method for saving a new record
 */
export const updateParking = async (_id: string, body: ParkingRequest) => {
  try {
    const result = await requestApi<ParkingResponse[]>({
      path: parking,
      method: "PATCH",
      body: body,
      concatUrl: _id,
    });
    const { ok, msg } = result;
    if (ok) return { ok };
    else return { ok, msg };
  } catch (e) {
    console.error("||* ==> Error <== *||", e);
    alertNotification({
      msm: "Error",
      description: "Error al modificar registro",
      type: "error",
    });
    return { ok: false };
  }
};
