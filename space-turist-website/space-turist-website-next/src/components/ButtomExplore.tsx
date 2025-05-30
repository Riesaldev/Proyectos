"use client";

type ButtonExploreProps = {
  onClick: () => void;
};

export default function ButtonExplore({ onClick }: ButtonExploreProps) {
  return (
    <button
      className="bg-white text-3xl text-gray-800 h-50 w-50 p-6 rounded-full font-[bellefair] hover:shadow-[0_0_0_80px_rgba(255,255,255,0.1)] hover:text-gray-400 transition duration-300"
      title="explore"
      type="button"
      onClick={onClick}
    >
      EXPLORE
    </button>
  );
}

