import { useState, useEffect, useRef, type JSX } from 'react'
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Info } from 'lucide-react';
import ThemeController from './ThemeController';

type NavLinkType = {
  label: string;
  to: string;
  type: 'route' | 'scroll' | 'notice';
}

const navLinks: NavLinkType[] = [
  { label: 'Home',     to: '/',        type: 'route'  },
  { label: 'Courses', to: 'courses', type: 'scroll' },
  { label: 'Payment',  to: 'courses', type: 'notice'  },
];

const Header = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false)
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isPaymentActive = location.pathname.startsWith('/payment');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    }
  }, [])

  const handlePaymentNotice = (event: React.UIEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();
    setIsOpen(false);
    scrollToSection(targetId);
  
    setShowToast(true);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setShowToast(false), 3000);
  }

  const scrollToSection = (targetId: string): void => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const handleScroll = (event: React.UIEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();
    setIsOpen(false);
    scrollToSection(targetId);
  }

  return (
    <header className="fixed top-0 z-50 w-full">
      {showToast && (
        <div className="toast toast-top toast-center z-60">
          <div className="alert alert-info shadow-lg">
            <Info className="size-5 shrink-0" />
            <span>Select a course below to continue to payment</span>
          </div>
        </div>
      )}
      <div className="drawer drawer-end">
        <input
          id="mobile-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isOpen}
          onChange={(e) => setIsOpen(e.target.checked)}
        />

        <div className="drawer-content">
          <nav className="navbar justify-between bg-base-100/80 backdrop-blur-md shadow-sm px-4 sm:px-8">
            <div>
              <NavLink to="/" end className="text-xl font-bold text-primary">
                Digital<span className='text-secondary-content dark:text-secondary'>Hub</span>
              </NavLink>
            </div>

            <div className="hidden sm:flex">
              <ul className="menu menu-horizontal gap-3 px-1">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    {link.type === 'route' ? (
                      <NavLink
                        to={link.to}
                        end={link.to === '/'}
                        className={({ isActive }) =>
                          `rounded-md font-medium transition-colors border border-accent ${
                            isActive
                              ? 'text-primary bg-primary/10'
                              : 'text-base-content/80 hover:text-primary hover:bg-transparent'
                          }`
                        }
                      >
                        {link.label}
                      </NavLink>
                    ) : (
                      <a
                        href={`#${link.to}`}
                        className={`border border-accent font-medium transition-colors ${
                          link.type === 'notice' && isPaymentActive
                            ? 'text-primary bg-primary/10'
                            : 'text-base-content/80'
                        }`}
                        onClick={(event) =>
                          link.type === 'notice'
                            ? handlePaymentNotice(event, link.to)
                            : handleScroll(event, link.to)
                        }
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}  
              </ul>
            </div>

            <div className='hidden sm:flex'>
              <ThemeController />
            </div>

            <div className="sm:hidden">
              <label
                htmlFor="mobile-drawer"
                aria-label="Open menu"
                className="btn btn-ghost btn-circle"
              >
                <Menu className="size-6" />
              </label>
            </div>
          </nav>
        </div>

        <div className="drawer-side z-50">
          <label
            htmlFor="mobile-drawer"
            aria-label="Close menu"
            className="drawer-overlay"
          ></label>

          <div className="min-h-full w-full min-[260px]:w-[80%] sm:w-72 bg-base-100 p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary">Digital<span className='text-secondary-content dark:text-secondary'>Hub</span></span>
              <button
                aria-label="Close menu"
                className="btn btn-ghost btn-circle btn-sm"
                onClick={() => setIsOpen(false)}
              >
                <X className="size-5" />
              </button>
            </div>

            <ul className="menu gap-1 p-0">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.type === 'route' ? (
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `rounded-btn font-medium transition-colors ${
                          isActive
                            ? 'text-primary bg-primary/10'
                            : 'text-base-content/80'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ) : (
                    <a
                      href={`#${link.to}`}
                      className={`rounded-btn font-medium transition-colors ${
                        link.type === 'notice' && isPaymentActive
                          ? 'text-primary bg-primary/10'
                          : 'text-base-content/80'
                      }`}
                      onClick={(event) =>
                        link.type === 'notice'
                          ? handlePaymentNotice(event, link.to)
                          : handleScroll(event, link.to)
                      }
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-4 border-t border-base-300">
              <ThemeController />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header