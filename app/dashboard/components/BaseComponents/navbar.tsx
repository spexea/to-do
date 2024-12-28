import React from "react";
interface NavbarProps {
  title: string;
  searchComponent: React.ReactNode;
  dropdownComponent: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({
  title,
  searchComponent,
  dropdownComponent,
}) => {
  return (
    <nav className="navbar bg-base-100 shadow-lg px-6 py-4 rounded-b-xl flex flex-col items-start md:flex-row md:items-center md:gap-6 w-full">
      <a className="text-3xl font-semibold text-primary mb-4 md:mb-0 md:text-4xl">
        {title}
      </a>

      <div className="flex flex-col gap-4 w-full items-start md:flex-row md:items-center md:gap-6">
        {searchComponent}
        {dropdownComponent}
      </div>
    </nav>
  );
};
export default Navbar;
