export interface ParkingRequest {
  numPlaca: string;
  startDate: string;
  endDate?: string;
}

export interface ParkingResponse extends ParkingRequest {
  _id: string;
}
