import { Button, ButtonIcon, Flex } from "@playbook/ui";
import { ListChecks, Shapes, Triangle } from "lucide-react";
import Link from "next/link";

const Logo = () => (
  <Flex gap={"xs"} align={"center"}>
    <Shapes className="h-7 w-7" />
    <span className="font-semibold text-2xl">Taskify</span>
  </Flex>
);

type HeroSectionProps = {
  title: string;
  description: string;
};

export const Hero = (props: HeroSectionProps) => {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 lg:px-8">
        <header className="z-50">
          <nav
            className="flex items-center justify-between p-6 lg:px-8"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <Logo />
            </div>

            <div>
              <Link
                href="/auth/sign-in"
                className="text-sm font-semibold cursor-pointer leading-6 text-gray-900"
              >
                Log in to demo <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </nav>
        </header>
        <div
          className="absolute inset-x-0 -top-40 -z-50 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#7a7a7a] to-[#202022] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="flex justify-center pb-6">
            <ListChecks className="h-14 w-14 stroke-1 bg-accent/10 p-3 mb-4 rounded border shadow-inner" />
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-bold pb-2 bg-clip-text text-transparent bg-gradient-to-l from-slate-600 to-slate-900 sm:text-6xl">
              {props.title}
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-600">
              {props.description}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href={"/app/todos"}>
                <Button variant={"solid"} size={"xl"}>
                  <ButtonIcon Icon={<Triangle />} orientation={"leading"} />
                  Deploy to Vercel
                </Button>
              </Link>
              <Link
                href="/auth/sign-in"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Sign up to demo <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#7a7a7a] to-[#202022] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};
