"use client";

import ButtonExplore from "@/components/ButtomExplore";


export default function Home() {


  return (
    <main className="text-white flex flex-col justify-center min-h-screen">
      <div className="flex flex-col items-center sm:flex-row h-full ">
      <div className="flex flex-col  h-full w-[540px] gap-10 mt-4 sm:ml-60 items-center">
        <h1 className="text-white/60 font-[barlow] uppercase text-lg  tracking-widest">
        So, you want to travel to
        </h1>
        <span className="text-9xl font-[bellefair] uppercase">
        Space
        </span>
        <section className="max-w-[480px] w-svw">
        <p className="text-base font-light text-white/60 font-[barlow] leading-loose">
          Let’s face it; if you want to go to space, you might as well genuinely go to
          outer space and not hover kind of on the edge of it. Well sit back, and relax
          because we’ll give you a truly out of this world experience!
        </p>
        </section>
      </div>
      <div className="flex flex-col items-center sm:items-center h-full w-full mt-12 pt-8 sm:mt-0">
        <ButtonExplore onClick={() => alert("Exploring space!")} />
      </div>
      </div>
    </main>
  );

}
