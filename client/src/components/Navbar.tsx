import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className=" mx-auto flex justify-center items-center">
        <Link href="/" className="text-xl font-bold">
          Lead Management System
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
