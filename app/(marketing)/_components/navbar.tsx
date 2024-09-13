"use client"
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { useState } from "react";
import { PiSignOut } from "react-icons/pi";

export const Navbar = () => {

  const { user } = useUser()
  const [dropDown, setdropDown] = useState<boolean>(false)


  let navUser = (
    <div className="flex w-full items-center justify-between space-x-4 md:block md:w-auto">
          <Button size="sm" variant="outline" asChild>
            <Link href="/sign-in">Login</Link>
          </Button>

          <Button size="sm" asChild>
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
  )
  if(user) {
    navUser = (
      <UserButton />
  )
  }

  return (
    <nav className="fixed top-0 flex h-14 w-full items-center border-b bg-white px-4 shadow-sm">
      <div className="mx-auto flex w-full items-center justify-between md:max-w-2xl">
        <Logo />

        {navUser}
        {/* {navUser} */}
        {/* <div className="flex w-full items-center justify-between space-x-4 md:block md:w-auto">
          <Button size="sm" variant="outline" asChild>
            <Link href="/sign-in">Login</Link>
          </Button>

          <Button size="sm" asChild>
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div> */}
      </div>
    </nav>
  );
};
