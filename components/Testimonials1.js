// A beautiful single testimonial with a user name and company name
const Testimonial = () => {
  return (
    <section
      className="relative isolate overflow-hidden bg-base-100 px-8 py-24 sm:py-32"
      id="testimonials"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.base-300),theme(colors.base-100))] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-base-100 shadow-lg ring-1 ring-base-content/10 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto max-w-2xl lg:max-w-5xl">
        <figure className="mt-10">
          <div className="flex flex-col items-center gap-8">
            <blockquote className="text-xl font-medium leading-8 text-base-content sm:text-2xl sm:leading-10 text-center max-w-3xl">
              I got your boilerplate and having the payments setup with Stripe
              + user auth is a blessing. This will save me like a week of work
              for each new side project I spin up. I appreciate that is well
              documented, as well. 100% worth it!
            </blockquote>
            <figcaption className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-semibold text-lg">A</span>
              </div>
              <div className="text-base text-center">
                <div className="font-semibold text-base-content mb-0.5">
                  Amanda Lou
                </div>
                <div className="text-base-content/60">
                  Indie Maker &amp; Developer
                </div>
              </div>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
};

export default Testimonial;
