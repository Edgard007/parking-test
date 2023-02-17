export interface ParkingRequest {
  numPlaca: string;
  startDate: string;
  endDate?: string;
  amount?: number;
}

export interface ParkingResponse extends ParkingRequest {
  _id: string;
}
