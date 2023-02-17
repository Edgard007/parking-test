export interface VehiclesRequest {
  numPlaca: string;
  entryDate: string;
  type: string;
}

export interface VehiclesResponse extends VehiclesRequest {
  _id: string;
}
