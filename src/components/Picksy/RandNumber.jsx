import { getRandomInteger } from "@/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export const meta = {
  title: "Random Number",
  description: "Write a description here",
};

export default function RandNumber() {
  const [number, setNumber] = useState(72);
  const [minLimit, setMinLimit] = useState(0);
  const [maxLimit, setMaxLimit] = useState(100);

  const handleClick = () => {
    setNumber(getRandomInteger(minLimit, maxLimit));
  };

  return (
    <div className="flex-col space-y-4">
      <div className="flex space-x-1">
        <Input
          className="text-center"
          id="min limit"
          type="number"
          value={minLimit}
          onChange={(e) => setMinLimit(Number(e.target.value))}
        />
        <Input
          className="text-center"
          id="max limit"
          type="number"
          value={maxLimit}
          onChange={(e) => setMaxLimit(Number(e.target.value))}
        />
      </div>
      <p className="text-center text-5xl m-auto" onClick={handleClick}>
        {number}
      </p>
    </div>
  );
}
