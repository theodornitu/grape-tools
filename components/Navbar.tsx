import { useAuth } from "@elrond-giants/erd-react-hooks/dist/useAuth/useAccount";
import Link from 'next/link';
import React from 'react';

import { authPath, homePath } from '../utils/routes';

export default function Navbar() {
  const { logout, authenticated } = useAuth();
  const navbarMenu = React.useRef<HTMLDivElement>(null);
  const bar1 = React.useRef<HTMLDivElement>(null);
  const bar2 = React.useRef<HTMLDivElement>(null);
  const bar3 = React.useRef<HTMLDivElement>(null);

  const expandCollapse = () => {
    navbarMenu.current?.classList.toggle("open");
    const elements = navbarMenu.current?.querySelectorAll("a");

    if (navbarMenu.current?.classList.contains("lg-max:max-h-0")) {
      navbarMenu.current?.classList.remove("lg-max:max-h-0");
      navbarMenu.current?.classList.add("lg-max:max-h-54");
      setTimeout(function() {
        elements !== undefined &&
          elements.forEach((element: any) => {
            element.classList.remove("lg-max:opacity-0");
          });
      }, 50);
    } else {
      setTimeout(function() {
        elements !== undefined &&
          elements.forEach((element: any) => {
            element.classList.add("lg-max:opacity-0");
          });
      }, 100);
      navbarMenu.current?.classList.remove("lg-max:max-h-54");
      navbarMenu.current?.classList.add("lg-max:max-h-0");
    }

    bar1.current?.classList.toggle("rotate-45");
    bar1.current?.classList.toggle("origin-10-10");
    bar1.current?.classList.toggle("mt-1");
    bar2.current?.classList.toggle("opacity-0");
    bar3.current?.classList.toggle("-rotate-45");
    bar3.current?.classList.toggle("origin-10-90");
    bar3.current?.classList.toggle("mt-0.75");
    bar3.current?.classList.toggle("mt-1.75");
  };

  return (
    <div className="container sticky top-0 z-sticky">
      <div className="flex flex-wrap -mx-3">
        <div className="w-full max-w-full px-3 flex-0">
          <nav className="absolute top-0 left-0 right-0 z-30 flex flex-wrap items-center px-4 py-2 mx-6 my-4 rounded-xl bg-violet-100 backdrop-blur-2xl backdrop-saturate-200 lg:flex-nowrap lg:justify-start">
            <div className="flex items-center justify-between w-full p-0 pl-6 mx-auto flex-wrap-inherit sm-max:pl-0 sm-max:ml-2">
              <a className="py-2.375 text-sm mr-4 whitespace-nowrap font-bold text-slate-800">
                {/* <Link href={homePath}>Hoya, Grape!</Link> */}
                Hoya, Grape!
              </a>
              <button
                onClick={expandCollapse}
                className="px-3 py-1 ml-2 leading-none transition-all bg-transparent border border-transparent border-solid rounded-lg shadow-none cursor-pointer text-lg ease-soft-in-out lg:hidden"
                type="button"
                aria-controls="navigation"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="inline-block mt-2 align-middle bg-center bg-no-repeat bg-cover w-6 h-6 bg-none">
                  <span
                    ref={bar1}
                    className="w-5.5 rounded-xs relative my-0 mx-auto block h-px bg-gray-600 transition-all duration-300"
                  />
                  <span
                    ref={bar2}
                    className="w-5.5 rounded-xs mt-1.75 relative my-0 mx-auto block h-px bg-gray-600 transition-all duration-300"
                  />
                  <span
                    ref={bar3}
                    className="w-5.5 rounded-xs mt-1.75 relative my-0 mx-auto block h-px bg-gray-600 transition-all duration-300"
                  />
                </span>
              </button>
              <div
                ref={navbarMenu}
                className="items-center justify-end flex-grow overflow-hidden transition-all duration-500 ease-soft lg-max:max-h-0 basis-full lg:flex lg:basis-auto"
              >
                <span className="max-h-54 hidden"></span>
                <ul className="flex flex-col items-center pl-0 mb-0 list-none lg:flex-row">
                  <li className="mb-2 lg:mb-0">
                        <a
                          href="https://twitter.com/grape_tools"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <button 
                            className="leading-pro ml-1 lg:ml-0 hover:scale-102 lg:mb-0 hover:shadow-soft-xs bg-violet-600 border-white border active:opacity-85 ease-soft-in text-xs tracking-tight-soft bg-150 bg-x-25 rounded-3.5xl mb-0 inline-block cursor-pointer bg-transparent mr-1 px-8 py-2 text-center align-middle font-bold uppercase text-white transition-all"
                          >
                            twitter
                          </button>
                        </a>
                    </li>
                  {authenticated ? (
                    <li>
                      <button
                        onClick={() => {
                          logout();
                        }}
                        className="leading-pro ml-1 lg:ml-0 hover:scale-102 lg:mb-0 hover:shadow-soft-xs bg-violet-600 border-white border active:opacity-85 ease-soft-in text-xs tracking-tight-soft bg-150 bg-x-25 rounded-3.5xl mb-0 inline-block cursor-pointer bg-transparent mr-1 px-8 py-2 text-center align-middle font-bold uppercase text-white transition-all"
                      >
                        disconnect
                      </button>
                    </li>
                  ) : (
                    <li>
                      <button className="leading-pro ml-1 lg:ml-0 hover:scale-102 lg:mb-0 hover:shadow-soft-xs bg-violet-600 border-white border active:opacity-85 ease-soft-in text-xs tracking-tight-soft bg-150 bg-x-25 rounded-3.5xl mb-0 inline-block cursor-pointer bg-transparent mr-1 px-8 py-2 text-center align-middle font-bold uppercase text-white transition-all">
                        <Link href={authPath}>connect</Link>
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
