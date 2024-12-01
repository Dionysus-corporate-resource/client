import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function EnhancedMonochromeLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <header
        className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md z-50 "
        style={{ borderBottom: "1px solid hsl(0 0 14.9)" }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-sm font-bold">лтк Дионис</div>
          <nav className="hidden md:flex space-x-6 items-center">
            <NavLink
              to="/login"
              className="hover:text-gray-300 transition-colors"
            >
              Войти
            </NavLink>
            <NavLink
              to="/register"
              className="hover:text-gray-300 transition-colors"
            >
              Зарегистрироваться
            </NavLink>
          </nav>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main className="pt-16 h-screen inset-0 bg-[radial-gradient(circle_at_30%_30%,_#ffffff10_0%,_transparent_70%)]">
        {/* Hero Section */}
        <section className="relative h-full overflow-hidden ">
          <div className="absolute "></div>
          <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-12 leading-tight">
                {/* лтк */}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                  Логистическая транспортная компания
                </span>
              </h1>
              <p className="text-xl mb-12 text-gray-300">
                Транспортная логистическая компания надежный партнер в сфере
                транспортной логистики. Мы предлагаем комплексные решения для
                доставки грузов любого объема и сложности по всей стране и за её
                пределами.
              </p>
              <NavLink to="/product">
                <Button className="bg-white text-black hover:bg-gray-200 transition-colors text-lg py-6 px-8 rounded-full shadow-lg">
                  Смотреть заявки <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </NavLink>
            </div>
          </div>
        </section>
      </main>

      {/* <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">MonoApp</h3>
              <p className="text-gray-400">
                Elevating design through simplicity and power.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Tutorials
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2024 MonoApp. All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
