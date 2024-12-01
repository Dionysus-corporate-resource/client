import { Button } from "@/components/ui/button";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { NavLink } from "react-router-dom";
// import { useAuth } from "@/app/providers/AuthProvider";
import { useState } from "react";
import { useAuth } from "@/app/providers/auth-provider";
import { LockIcon, MailIcon, PhoneIcon, UserIcon } from "lucide-react";

type IFormData = {
  phone: string;
  userName: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const context = useAuth();
  const [formData, setFormData] = useState<IFormData>({
    email: "",
    password: "",
    userName: "",
    phone: "",
  });
  // console.log(formData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setFormData((formData) => {
      return {
        ...formData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    context?.logUp(formData);
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2">
        <section
          className="bg-primary text-primary-foreground p-6 sm:p-10 lg:p-16 flex flex-col justify-center"
          style={{
            backgroundImage: 'url("/images/car.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center 120%",
          }}
        >
          {/* <div className="max-w-md space-y-6">
            <h1 className="text-4xl font-bold tracking-tight">
              Join our vibrant community Simple
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Unlock a world of opportunities by connecting with like-minded
              individuals. Explore new possibilities and grow together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" className="w-full sm:w-auto">
                <NavLink to="/">Learn More</NavLink>
              </Button>
            </div>
          </div> */}
        </section>
        <section className="p-6 sm:p-10 lg:p-16 flex items-center justify-center">
          <div className="w-full max-w-lg flex-1">
            <CardHeader className="space-y-1 items-center mb-4">
              <CardTitle className="text-4xl">Create an account</CardTitle>
              <CardDescription>
                Enter your details below to get started.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="userName" className="flex items-center">
                      <UserIcon className="mr-2 h-4 w-4" />
                      Name
                    </Label>
                    <Input
                      id="userName"
                      name="userName"
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center">
                      <MailIcon className="mr-2 h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="flex items-center">
                      <LockIcon className="mr-2 h-4 w-4" />
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      onChange={handleChange}
                      placeholder="*********"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center">
                      <PhoneIcon className="mr-2 h-4 w-4" />
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      name="phone"
                      onChange={handleChange}
                      placeholder="+8 (918) 555-5555"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </CardContent>
              <CardFooter className="flex flex-col items-center gap-4">
                <div className="relative w-full">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Login
                    </span>
                  </div>
                </div>
              </CardFooter>
            </form>

            <CardFooter className="flex gap-2 justify-center">
              Already have an account?
              <NavLink to="/login">Sign in</NavLink>
            </CardFooter>
          </div>
        </section>
      </main>
    </div>
  );
}
