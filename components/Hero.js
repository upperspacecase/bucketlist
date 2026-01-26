import config from "@/config";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto bg-base-100 flex flex-col items-center justify-center gap-10 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center">
        <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight">
          Ship your startup in days, not weeks
        </h1>
        <p className="text-lg opacity-80 leading-relaxed max-w-2xl">
          The NextJS boilerplate with all you need to build your SaaS, AI tool,
          or any other web app. From idea to production in 5 minutes.
        </p>
        <button className="btn btn-primary btn-wide">
          Get {config.appName}
        </button>
      </div>
    </section>
  );
};

export default Hero;
