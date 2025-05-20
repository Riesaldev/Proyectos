"use client";

import ButtonExplore from "@/components/ButtomExplore";


export default function Home() {


  return (
    <main className="flex flex-col items-center pt-4 text-white">
      <div className="flex flex-col items-center sm:items-center h-full w-full gap-6 mt-4">
        <h1 className="font-extralight  text-white/60 font-[barlow] uppercase">
          So, you want to travel to
        </h1>
        <span className="text-7xl font-light font-[bellefair] uppercase">
          Space
        </span>
        <section className="items-center sm:items-center max-w-[500px] w-svw mt-4">
        <p className="text-base/7 text-center font-light sm:text-base text-white/60 font-[barlow] p-4 border border-amber-700 ">
          Let’s face it; if you want to go to space, you might as well genuinely go to
          outer space and not hover kind of on the edge of it. Well sit back, and relax
          because we’ll give you a truly out of this world experience!
        </p>
        </section>
        <div className="flex flex-col items-center sm:items-center h-full w-full gap-10 p-8 mt-42">
          <ButtonExplore onClick={() => alert("Exploring space!")} />
        </div>
      </div>
    </main>
  );

}
