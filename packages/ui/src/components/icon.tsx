import * as React from "react";
import * as Icons from "lucide-react";

interface IconProp {
  icon: Icons.LucideIcon;
}

const Icon = (props: IconProp) => {
  return <props.icon className="h-4 w-4" />;
};

export { Icon };
