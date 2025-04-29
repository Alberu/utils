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
//   const textAreaRef = useRef(null);
//   const cypherAreaRef = useRef(null);

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

//   const resizeTextArea = (textarea) => {
//     textarea.style.height = "auto";
//     textarea.style.height = textarea.scrollHeight + "px";
//   };

//   useEffect(() => {
//     resizeTextArea(textAreaRef.current);
//     resizeTextArea(cypherAreaRef.current);
//   }, [regularText, cypherText]);

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
          {/* <textarea
            ref={textAreaRef}
            value={regularText}
            onChange={(e) => handleRegularInput(e.target.value)}
            placeholder="Enter some text"
            className="overflow-auto resize-none text-center text-6xl flex w-full bg-transparent transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            rows={1}
          />
          <Separator />
          <textarea
            ref={cypherAreaRef}
            value={cypherText}
            onChange={(e) => handleCypherInput(e.target.value)}
            placeholder="Cypher text goes here"
            className="overflow-auto resize-none text-center text-6xl flex w-full bg-transparent transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            rows={1}
          /> */}
        </div>
      </PageLayout>
    </>
  );
}
