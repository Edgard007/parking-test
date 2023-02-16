//* ==> UseDataApi <== *//
import { requestApi } from "../../config/useDataApi";

//* ==> Paths <== *//
import { parking } from "../../config/paths";

// ==> Helpers
import { alertNotification } from "../../helpers/notifications";

// ==> Interfaces
import { ParkingResponse } from "../../interfaces/parking.interface";

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
        description: "Error al obtener registros",
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
