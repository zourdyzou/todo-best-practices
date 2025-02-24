import { Hero } from "./Hero/Hero";

export const HomePage = () => {
  return (
    <div
      className="flex flex-col justify-center items-center"
      style={{ width: "100vw", height: "100vh", background: "hotpink" }}
    >
      <Hero />

      <p className="text-4xl font-bold text-slate-50 p-10">
        Random dog from an API
      </p>
    </div>
  );
};
