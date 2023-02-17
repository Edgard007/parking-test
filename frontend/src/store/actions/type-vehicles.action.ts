//* ==> UseDataApi <== *//
import { requestApi } from "../../config/useDataApi";

//* ==> Paths <== *//
import { typeVehicles } from "../../config/paths";

// ==> Helpers
import { alertNotification } from "../../helpers/notifications";

// ==> Interfaces
import {
  TypeVehicleRequest,
  TypeVehicleResponse,
} from "../../interfaces/type-vehicle";

/**
 * Method to obtain list of vehicles
 */
export const getTypeVehicles = async () => {
  try {
    const result = await requestApi<TypeVehicleResponse[]>({
      path: typeVehicles,
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
    console.error("||* ==> Error getTypeVehicles <== *||", e);
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
export const saveTypeVehicle = async (body: TypeVehicleRequest) => {
  try {
    const result = await requestApi<TypeVehicleResponse[]>({
      path: typeVehicles,
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
export const updateTypeVehicle = async (_id: string, body: TypeVehicleRequest) => {
  try {
    const result = await requestApi<TypeVehicleResponse[]>({
      path: typeVehicles,
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
