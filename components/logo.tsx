import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hidden items-center gap-x-2 transition hover:opacity-75 md:flex">
        <Image src="/logo.svg" height={30} width={30} alt="Logo" />
        <p className="pb-1 text-lg text-neutral-700">Byte Learn</p>
      </div>
    </Link>
  );
};

