import Link from "next/link";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { Medal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { text } from "stream/consumers";

const headingFont = localFont({
  src: "../../public/fonts/calsans.woff2",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const MarektingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center",
          headingFont.className,
        )}
      >
        <div className="mb-4 flex items-center rounded-full bg-amber-100 p-4 uppercase text-amber-700 shadow-sm">
          <Medal className="mr-2 h-6 w-6" />
          No 1 Learning Platform
        </div>

        <h1 className="mb-6 text-center text-3xl text-neutral-800 md:text-6xl">
          Byte Learn helps you learn better
        </h1>

        <div className="w-fit rounded-md bg-gradient-to-r from-fuchsia-600 to-pink-600 p-2 px-4 text-3xl lowercase text-white md:text-6xl">
          learn Forward
        </div>
      </div>

      <div
        className={cn(
          "mx-auto mt-4 max-w-xs cursor-pointer text-center text-sm text-neutral-400 md:max-w-2xl md:text-xl",
          textFont.className,
        )}
      >
        Learn, manage progress, and reach new learning peaks. 
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href="/sign-up">Get Learn Byte for free</Link>
      </Button>
    </div>
  );
};

export default MarektingPage;
