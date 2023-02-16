//* ==> UseDataApi <== *//
import { requestApi } from "../../config/useDataApi";

//* ==> Paths <== *//
import { officialVehicles } from "../../config/paths";

// ==> Helpers
import { alertNotification } from "../../helpers/notifications";

// ==> Interfaces
import { OfficialVehiclesResponse } from "../../interfaces/officialVehicles.interface";

/**
 * Method to obtain list of official vehicles
 */
export const getOfficialVehicles = async () => {
  try {
    const result = await requestApi<OfficialVehiclesResponse[]>({
      path: officialVehicles,
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
    console.error("||* ==> Error getOfficialVehicles <== *||", e);
    alertNotification({
      msm: "Error",
      description: "Error al obtener registros",
      type: "error",
    });
    return [];
  }
};
