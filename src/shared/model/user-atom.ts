import { atomWithStorage } from "jotai/utils";
// import { atom } from "jotai";
import { IUserDto } from "./types/user";

export const userStorageAtom = atomWithStorage<IUserDto | null>("user", null);

// export const userAtom = atom<IUserDto | null>(null);
