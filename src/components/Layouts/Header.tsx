import { ModeToggle } from "../theme-toogle";
import Link from "next/link";

const Header = () => {
  return (
    <div className="shrink-0 flex h-[60px] w-full max-w-[990px] justify-between items-center sm:items-end mx-auto py-1 mt-6">
      <div className="flex items-center border rounded-lg px-3 py-1"> 
          <svg
            fill="none"
            height="38"
            viewBox="0 0 40 48"
            width="40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m0 9c0-2.76142 2.23858-5 5-5h10c2.7614 0 5 2.23858 5 5v9.8192c.0002.06.0003.1203.0003.1808 0 2.7575 2.2322 4.9936 4.9881 5h.0116 10c2.7614 0 5 2.2386 5 5v10c0 2.7614-2.2386 5-5 5h-10c-2.7614 0-5-2.2386-5-5v-10c0-.0139.0001-.0277.0002-.0416-.0224-2.7422-2.2523-4.9584-4.9999-4.9584-.0129 0-.0258 0-.0387 0h-9.9616c-2.76142 0-5-2.2386-5-5z"
              fill="#2563eb"
            />
          </svg>
        
        <h1 className="ml-2 font-bold">CORET</h1>
      </div>
      <div className="flex gap-3 items-center">
        <div className="flex gap-3 items-center border rounded-lg px-3 py-1">
          <p className="hover:bg-slate-300 dark:hover:bg-slate-800 p-2 rounded-sm"><Link
          href="/login"
          >
          Login
          </Link></p>
          <p className="border rounded-lg p-2 bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white hover:from-pink-500 hover:to-violet-500"><Link
          href="/register"
          >
          Signup
          </Link></p>
        </div>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
