import { atomWithStorage } from "jotai/utils";
import { CorporateLogisticianDto } from "../types/user";
// import { atom } from "jotai";

export const corporateLogisticianStorageAtom =
  atomWithStorage<CorporateLogisticianDto | null>("user", null);

// export const corporateLogisticianAtom = atom<CorporateUserDto | null>(null);
