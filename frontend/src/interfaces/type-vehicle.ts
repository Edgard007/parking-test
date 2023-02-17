export interface TypeVehicleRequest {
  name: string;
  amount: number;
}

export interface TypeVehicleResponse extends TypeVehicleRequest {
  _id: string;
}
