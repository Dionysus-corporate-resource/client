import { TBookingDto } from "@/shared/model/types/booking";
import { atom } from "jotai";

export const sortbookingAtom = atom<TBookingDto[] | null | undefined>(null);
export const filterbookingAtom = atom<TBookingDto[] | null | undefined>(null);
export const isMapViewFullAtom = atom<boolean>(false);

// export const userStorageAtom = atom<IUserDto | null>(null);
