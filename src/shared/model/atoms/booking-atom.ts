import { atom } from "jotai";
import { IBookingDto } from "../types/booking";

export const sortBookingAtom = atom<IBookingDto[]>([]);
export const bookingAtom = atom<IBookingDto[]>([]);
export const bookingManagerAtom = atom<IBookingDto[]>([]);
