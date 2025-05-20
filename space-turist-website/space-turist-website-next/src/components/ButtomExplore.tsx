"use client";

type ButtonExploreProps = {
  onClick: () => void;
};

export default function ButtonExplore({ onClick }: ButtonExploreProps) {
  return (
    <button
      className="bg-white text-black h-30 w-30 p-6 rounded-full font-[bellefair]"
      title="explore"
      type="button"
      onClick={onClick}
    >
      EXPLORE
    </button>
  );
}

