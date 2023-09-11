import HeroSection from "./_components/hero-section";

export default function Page() {
  return (
    <div>
      <HeroSection
        title={"Track your todo list securely"}
        description={
          "OpenDo is an open-source todo app that you can deploy easily with your own database so you data is secure and private."
        }
      />
    </div>
  );
}
