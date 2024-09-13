"use client"
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { useState } from "react";

export const Navbar = () => {

  const { isSignedIn, isLoaded } = useUser();


  return (
    <nav className="fixed top-0 flex h-14 w-full items-center border-b bg-white px-4 shadow-sm">
      <div className="mx-auto flex w-full items-center justify-between md:max-w-2xl">
        <Logo />

        {isSignedIn && <UserButton />}


        {!isSignedIn && isLoaded && (
          <div className="flex w-full items-center justify-between space-x-4 md:block md:w-auto">
            <Button size="sm" variant="outline" asChild>
              <Link href="/sign-in">Login</Link>
            </Button>

            <Button size="sm" asChild>
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
