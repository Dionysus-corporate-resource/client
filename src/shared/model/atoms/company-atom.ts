import { atomWithStorage } from "jotai/utils";
import { ICompanyDto } from "../types/company";

export const companyStorageAtom = atomWithStorage<ICompanyDto | null>(
  "company",
  null,
);
