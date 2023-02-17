//* ==> UseDataApi <== *//
import { requestApi } from "../../config/useDataApi";

//* ==> Paths <== *//
import { vehicles } from "../../config/paths";

// ==> Helpers
import { alertNotification } from "../../helpers/notifications";

// ==> Interfaces
import { VehiclesResponse } from "../../interfaces/vehicles.interface";

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
