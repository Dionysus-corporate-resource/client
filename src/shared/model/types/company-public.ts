export type ICompanyPublic = {
  nameCompany: string;
  subcribeInfo: string;
};

export type ICompanyPublicDto = ICompanyPublic & {
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};
