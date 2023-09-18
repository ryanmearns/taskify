import Link from "next/link";

export const Banner = () => {
  return (
    <div className="flex items-center gap-x-6 bg-black justify-center px-6 py-2.5 sm:px-3.5">
      <p className="text-sm leading-6 text-white">
        This is a demonstration project using Next.js 13, Drizzle ORM and
        Next-Auth.
      </p>
    </div>
  );
};
