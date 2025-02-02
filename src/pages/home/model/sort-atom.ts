import { IBookingDto } from "@/shared/model/types/booking";
import { atom } from "jotai";

export const bookingAtom = atom<IBookingDto[] | null | undefined>(null);

// export const userStorageAtom = atom<IUserDto | null>(null);
