import { FadeIn } from "@playbook/ui";
import {
  Calendar,
  CheckCircleIcon,
  Folders,
  ListChecks,
  Rocket,
  Tags,
} from "lucide-react";
import Image from "next/image";

const features = [
  {
    name: "Tasks.",
    description: "Create, update and manage a list of tasks.",
    icon: CheckCircleIcon,
  },
  {
    name: "Projects.",
    description: "Create, update and manage a projects of tasks.",
    icon: Folders,
  },
  {
    name: "Labels.",
    description: "Create, customise and add labels to tasks.",
    icon: Tags,
  },
  {
    name: "Add due dates.",
    description: "Give your tasks projects due dates.",
    icon: Calendar,
  },
  {
    name: "Today, upcoming and overdue lists.",
    description: "View all your tasks due today, in the next week or overdue.",
    icon: ListChecks,
  },
  {
    name: "Deploy for your self.",
    description: "Your own instructure with your own data.",
    icon: Rocket,
  },
];

type FeaturesProps = {
  title: string;
  subTitle: string;
  description: string;
};

export const Features = (props: FeaturesProps) => {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-base font-semibold leading-7 text-slate-600">
            {props.subTitle}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight bg-gradient-to-l from-slate-600 to-slate-900 bg-clip-text text-transparent sm:text-4xl">
            {props.title}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {props.description}
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn>
            <Image
              src="https://tailwindui.com/img/component-images/project-app-screenshot.png"
              alt="App screenshot"
              className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
              width={2432}
              height={1442}
            />
          </FadeIn>
          <div className="relative" aria-hidden="true">
            <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]" />
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
                <feature.icon
                  className="absolute left-1 top-1 h-5 w-5 text-slate-600"
                  aria-hidden="true"
                />
                {feature.name}
              </dt>{" "}
              <dd className="inline">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};
