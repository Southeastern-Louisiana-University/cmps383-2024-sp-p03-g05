export interface reservationDto {
    id: number;
    hotel: string;
    address: string;
    phoneNumber: string;
    roomNumber: number,
    guestId: number,
    status: string,

  createdAt: Date,
  reservationStartDate: Date,
  reservationEndDate: Date
  }