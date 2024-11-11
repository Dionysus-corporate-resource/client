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
import { useState } from "react";
import { useAuth } from "@/app/providers/auth-provider";

type IFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const context = useAuth();
  const [formData, setFormData] = useState<IFormData>({
    email: "",
    password: "",
  });

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
    context?.logIn(formData);
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2">
        <section
          className="bg-primary text-primary-foreground p-6 flex flex-col justify-center "
          style={{
            backgroundImage: 'url("/images/avatar.PNG")',
            backgroundSize: "cover",
            backgroundPosition: "center 120%",
          }}
        >
          {/* <div className="max-w-md space-y-6 bg-opacity-50 bg-black p-8 rounded-lg">
            {" "}
            <h1 className="text-4xl font-bold tracking-tight">
              Join our vibrant community Simple Login
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
              <CardTitle className="text-4xl">Login to account</CardTitle>
              <CardDescription>Enter your email and password.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-1 gap-4">
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
                <div className="grid grid-cols-1 gap-4">
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
                </div>
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </CardContent>
            </form>
            <CardFooter className="flex flex-col items-center gap-4">
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Register
                  </span>
                </div>
              </div>
            </CardFooter>
            <CardFooter className="flex gap-2 justify-center">
              Don`t have an account?
              <NavLink to="/register">Sign Up</NavLink>
            </CardFooter>
          </div>
        </section>
      </main>
    </div>
  );
}

function LockIcon(props: unknown) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function MailIcon(props: unknown) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

//
