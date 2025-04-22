import { useState } from "react";

export const meta = {
  title: "Arrow",
  description: "Upon clicking the arrow, it spins and stops at a random orientation.",
};

export default function Arrow() {
  const animationDuration = 10000;

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleClick = () => {
    if (isSpinning) return;

    setIsSpinning(true);

    const randomAngle = Math.floor(Math.random() * 360);
    const totalRotation = rotation + 5 * 360 + randomAngle;

    setRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
    }, animationDuration);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center p-8 space-y-6">
        <div
          className={`w-32 h-32 flex items-center justify-center cursor-pointer ${
            isSpinning ? "pointer-events-none" : ""
          }`}
          onClick={handleClick}
        >
          <div
            className="transform transition-transform duration-1500 ease-out"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: `transform ${
                animationDuration / 1000
              }s cubic-bezier(.53,.01,.25,1.09)`,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="100%"
              height="100%"
              className="text-black fill-current"
            >
              <path d="M12 2L4 10h6v12h4V10h6L12 2z" />
            </svg>
          </div>
        </div>

        <p className="text-gray-700 text-center">
          {isSpinning ? "Who will it be 👀..." : "Click the arrow to spin it!"}
        </p>
      </div>
    </>
  );
}
