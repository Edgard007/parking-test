//* ==> UseDataApi <== *//
import { requestApi } from "../../config/useDataApi";

//* ==> Paths <== *//
import { vehicles } from "../../config/paths";

// ==> Helpers
import { alertNotification } from "../../helpers/notifications";

// ==> Interfaces
import {
  VehiclesRequest,
  VehiclesResponse,
} from "../../interfaces/vehicles.interface";

/**
 * Method to obtain list of vehicles
 */
export const getVehicles = async () => {
  try {
    const result = await requestApi<VehiclesResponse[]>({
      path: vehicles,
    });
    const { ok, data } = result;
    if (ok) return data || [];
    else {
      alertNotification({
        msm: "Error",
        description: "Error al obtener registros",
        type: "error",
      });
      return [];
    }
  } catch (e) {
    console.error("||* ==> Error getVehicles <== *||", e);
    alertNotification({
      msm: "Error",
      description: "Error al obtener registros",
      type: "error",
    });
    return [];
  }
};

/**
 * Method for saving a new record
 */
export const saveVehicle = async (body: VehiclesRequest) => {
  try {
    const result = await requestApi<VehiclesResponse[]>({
      path: vehicles,
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
 * Method for update a record
 */
export const updateVehicle = async (_id: string, body: VehiclesRequest) => {
  try {
    const result = await requestApi<VehiclesResponse[]>({
      path: vehicles,
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
