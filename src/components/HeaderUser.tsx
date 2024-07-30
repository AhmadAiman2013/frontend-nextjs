import Link from "next/link";

const HeaderUser = () => {
  return (
    <div className="flex gap-3 items-center bg-background dark:bg-background border rounded-lg px-3 py-1">
      <p className="hover:bg-slate-300 dark:hover:bg-slate-800 p-2 rounded-sm">
        <Link href="/login">Login</Link>
      </p>
      <p className="border rounded-lg p-2 bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white hover:from-pink-500 hover:to-violet-500">
        <Link href="/register">Signup</Link>
      </p>
    </div>
  );
};

export default HeaderUser;
