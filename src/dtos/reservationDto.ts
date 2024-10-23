import { PropertyDto } from "./propertyDto";
import { ReservationDetailsDTO } from "./reservationDetailsDTO";



export class ReservationsDTO{   

    propertyId: PropertyDto;

    userId: string;

    requestedAt: Date;

    checkIn: Date;

    checkOut: Date;

    reservationDetails: ReservationDetailsDTO;

    totalPrice: number;

}