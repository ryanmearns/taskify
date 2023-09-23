import { Metadata } from "next";
import { Banner } from "./_components/banner";
import { Footer } from "./_components/footer";
import { Hero } from "./_components/hero";

export const metadata: Metadata = {
  title: "Taskify",
  description: "Open source task management",
  icons: ["/icon.png"],
};

export default function Page() {
  return (
    <div>
      <Banner />
      <Hero
        title={"Track your todo list securely"}
        description={
          "Taskify is an open-source todo app that you can deploy easily with your own database so you data is private and secure."
        }
      />
      <Footer />
    </div>
  );
}
