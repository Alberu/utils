import AutoTextArea from "@/components/AutoTextArea";
import PageLayout from "@/components/PageLayout";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { letterToNumber, numberToLetter } from "@/utils/cypher";
import { fcumsum } from "d3";
import { useEffect, useRef, useState } from "react";

export const meta = {
  title: "Simple Cypher",
  description: "Change text into numbers and vice versa",
};

export default function Cypher() {
  const [regularText, setRegularText] = useState("");
  const [cypherText, setCypherText] = useState("");

  const handleRegularInput = (value) => {
    setRegularText(value);
    setCypherText(letterToNumber(value));
  };

  const handleCypherInput = (value) => {
    setCypherText(value);
    setRegularText(numberToLetter(value));
  };

  return (
    <>
      <PageLayout>
        <div className="space-y-4 w-full max-w-5xl">
          <AutoTextArea
            value={regularText}
            onChange={handleRegularInput}
            className="text-center text-4xl"
            placeholder="Enter some text"
          />
          <Separator />
          <AutoTextArea
            value={cypherText}
            onChange={handleCypherInput}
            className="text-center text-4xl"
            placeholder="Cypher text goes here"
          />
        </div>
      </PageLayout>
    </>
  );
}
