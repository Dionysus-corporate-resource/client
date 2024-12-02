import { useLocalStorage } from "@/hooks/use-localStorage";
import instance from "@/shared/api/axios-instance";
import { IUserDto } from "@/shared/model/types/user";
import { userStorageAtom } from "@/shared/model/user-atom";
import { useAtom } from "jotai";
import { createContext, ReactNode, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type LoginDto = {
  email: string;
  password: string;
};

type RegisterDto = {
  phone?: string;
  userName: string;
  email: string;
  password: string;
};

interface AuthContextProps {
  token: string | null;
  logIn: (data: LoginDto) => Promise<LoginDto>;
  logOut: () => void;
  logUp: (data: RegisterDto) => Promise<RegisterDto>;
  user: IUserDto | null;
}

const AuthContext = createContext<AuthContextProps | null>(null);
// TODO: add profile page
// TODO: add toast on error login/register
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/product";

  const [token, setToken] = useLocalStorage<string | null>("token", null);
  const [user, setUser] = useAtom(userStorageAtom);

  const logIn = async (data: LoginDto) => {
    try {
      const response = await instance.post("/auth/login", data);
      // console.log("loginRequest", response.data);

      setToken(response.data.token);
      setUser(response.data);

      navigate(redirectPath, { replace: true });
      return response.data;
    } catch (error) {
      console.error("Login error", error);
      throw error;
    }
  };

  const logUp = async (data: RegisterDto) => {
    try {
      const response = await registerRequest("/auth/register", data);
      setToken(response.data.token);
      console.log("registerRequest", data);
      navigate("/login", { replace: true });

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
  };

  return (
    <AuthContext.Provider value={{ token, logIn, logUp, logOut, user }}>
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

// TODO: тут нужно в сервере добавить phone как опционально свйство
function registerRequest(url: string, data: RegisterDto) {
  const requstData = {
    email: data.email,
    password: data.password,
    userName: data.userName,
    phone: data.phone,
  };
  return instance.post(`${url}`, requstData);
}
