import instance from "@/shared/api/axios-instance";
import {
  IProposalDevelopment,
  IProposalDevelopmentDto,
} from "@/shared/model/types/proposals-development";

export const proposalsDevelopmentApi = {
  getAll: async (): Promise<IProposalDevelopmentDto[]> => {
    return instance
      .get("/proposals-development")
      .then((data) => data.data)
      .catch((err) => console.error(err));
  },
  create: async (
    data: IProposalDevelopment,
  ): Promise<IProposalDevelopmentDto> => {
    return instance
      .post("/proposals-development", data)
      .then((data) => data.data)
      .catch((err) => console.error(err));
  },
};
