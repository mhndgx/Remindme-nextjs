import React from "react";
import { UserButton } from "@clerk/nextjs";
import ThemeSwitcher from "./ThemeSwitcher";
import Logo from "./Logo";
const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between p-4 h-[60px]">
      <Logo />
      <div className="flex gap-4 items-center">
        <UserButton afterSignOutUrl="/" />
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;
