import { useLocalStorage } from "@/hooks/use-localStorage";
import instance from "@/shared/api/axios-instance";
import { companyStorageAtom } from "@/shared/model/atoms/company-atom";
import { corporateLogisticianStorageAtom } from "@/shared/model/atoms/user-atom";
import { ICompanyDto } from "@/shared/model/types/company";
import {
  CorporateLogisticianDto,
  IRolesCorporate,
} from "@/shared/model/types/user";
import { useAtom } from "jotai";
import { createContext, ReactNode, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// то что приходит в функцию логирования
type LoginData = {
  email: string;
  password: string;
  nameCompany: string;
};
// приходит в ответ на вызов функции login
type CompanyDto = {
  token: string;
  existingEmmailLogisticianInCompany: {
    additionalInfo: string;
    userData: CorporateLogisticianDto;
    corporatePasswordHash: string;
    corporateRoles: IRolesCorporate;
    _id: string;
  };
};

type RegisterDto = {
  nameCompany: string;
  phone: string;
  userName: string;
  email: string;
  password: string;
};

interface AuthContextProps {
  token: string | null;
  logIn: (data: LoginData) => Promise<CompanyDto>;
  logOut: () => void;
  logUpCompany: (data: RegisterDto) => Promise<CompanyDto>;
  user: CorporateLogisticianDto | null;
  company: ICompanyDto | null;
}

const AuthContext = createContext<AuthContextProps | null>(null);
// TODO: add profile page
// TODO: add toast on error login/register
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/product";

  const [token, setToken] = useLocalStorage<string | null>("token", null);
  const [user, setUser] = useAtom(corporateLogisticianStorageAtom);
  const [company, setCompany] = useAtom(companyStorageAtom);

  const logIn = async (data: LoginData) => {
    try {
      const response = await instance.post("/company/login", data);
      console.log("loginRequest", response.data);

      setToken(response.data.token);
      setUser(response.data.LogisticianDto);
      setCompany(response.data.companyDto);

      navigate(redirectPath, { replace: true });
      return response.data;
    } catch (error) {
      console.error("Login error", error);
      throw error;
    }
  };

  const logUpCompany = async (data: RegisterDto) => {
    try {
      console.log("registerCompanyRequest data", data);
      const response = await instance.post("/company/register", data);
      setToken(response.data.token);

      return response.data;
    } catch (error) {
      console.error("Login error", error);
      throw error;
    }
  };

  const logOut = () => {
    console.log("logOut");
    setToken(null);
    setUser(null);
    setCompany(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, company, logIn, logUpCompany, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

// function loginRequest(url: string, data: LoginDto) {
//   return instance.post(`${url}`, data);
// }
