import AutoTextArea from "../AutoTextArea";
import { Separator } from "@/components/ui/separator";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const meta = {
  title: "Roulette",
  description: "Write a description here",
};

export default function Roulette() {
  const [rouletteList, setRouletteList] = useState("");
  const [items, setItems] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const wheelRef = useRef(null);

  // Parse the input text into an array of items
  useEffect(() => {
    const values = rouletteList
      .split(/\r?\n/)
      .filter((item) => item.trim() !== "");
    setItems(values);
  }, [rouletteList]);

  const handleRouletteList = (value) => {
    setRouletteList(value);
  };

  const spinWheel = () => {
    if (spinning || items.length <= 1) return;

    setSpinning(true);
    setSelectedItem(null);
    setShowResult(false);

    // Calculate a random stopping point (5-10 full rotations plus a random segment)
    const spinDuration = 5 + Math.random() * 3;
    const fullRotations = Math.floor(5 + Math.random() * 5) * 360;
    const randomAngle = Math.floor(Math.random() * 360);
    const newRotation = rotation + fullRotations + randomAngle;

    setRotation(newRotation);

    // Calculate which item will be selected based on the final rotation
    setTimeout(() => {
      const normalizedRotation = newRotation % 360;
      const segmentSize = 360 / items.length;
      const selectedIndex =
        items.length - 1 - Math.floor(normalizedRotation / segmentSize);
      const actualIndex = selectedIndex % items.length;
      setSelectedItem(items[actualIndex]);
      setSpinning(false);

      // Show result after a short delay
      setTimeout(() => {
        setShowResult(true);
      }, 200);
    }, spinDuration * 1000);
  };

  // Generate colors for wheel segments
  const getSegmentColor = (index) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ];
    return colors[index % colors.length];
  };

  // Get text color based on background color
  const getTextColor = (index) => {
    // For better readability - white on all colors
    return "text-white";
  };

  // Calculate text position and size dynamically
  const getTextStyle = (index, itemsCount) => {
    const segmentSize = 360 / itemsCount;
    const rotation = index * segmentSize;

    // Adjust text position based on number of segments
    const distanceFactor =
      itemsCount <= 4 ? 60 : itemsCount <= 8 ? 55 : itemsCount <= 12 ? 45 : 35;

    // Adjust text size based on number of segments
    const textSize =
      itemsCount <= 6 ? "text-sm" : itemsCount <= 12 ? "text-xs" : "text-xs";

    return {
      transform: `rotate(${
        segmentSize / 2 + rotation
      }deg) translateY(-${distanceFactor}%)`,
      fontSize: textSize,
    };
  };

  // Truncate text based on number of items
  const truncateText = (text, itemsCount) => {
    if (itemsCount <= 4) {
      return text.length > 20 ? `${text.substring(0, 17)}...` : text;
    } else if (itemsCount <= 8) {
      return text.length > 15 ? `${text.substring(0, 12)}...` : text;
    } else if (itemsCount <= 12) {
      return text.length > 10 ? `${text.substring(0, 7)}...` : text;
    } else {
      return text.length > 6 ? `${text.substring(0, 3)}...` : text;
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-4 space-y-6">
      <AutoTextArea
        className="text-center text-xl"
        value={rouletteList}
        onChange={handleRouletteList}
        placeholder="thi"
      />
      <Separator />

      <div className="relative w-full max-w-md aspect-square">
        {items.length > 1 ? (
          <>
            {/* Pointer/indicator */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <ArrowDown className="h-8 w-8 text-black" />
            </div>

            {/* Wheel */}
            <motion.div
              ref={wheelRef}
              className={`w-full h-full rounded-full overflow-hidden border-4 border-gray-800 relative ${
                !spinning && items.length > 1
                  ? "cursor-pointer hover:opacity-90 hover:shadow-lg transition-all"
                  : ""
              }`}
              animate={{ rotate: rotation }}
              transition={{
                duration: spinning ? 5 + Math.random() * 3 : 0,
                ease: "easeOut",
              }}
              onClick={!spinning && items.length > 1 ? spinWheel : undefined}
            >
              {items.map((item, index) => {
                const segmentSize = 360 / items.length;
                const rotation = index * segmentSize;

                return (
                  <div
                    key={index}
                    className={`absolute w-full h-full ${getSegmentColor(
                      index
                    )}`}
                    style={{
                      clipPath: `polygon(50% 50%, 50% 0%, ${
                        50 +
                        50 *
                          Math.cos(((rotation + segmentSize) * Math.PI) / 180)
                      }% ${
                        50 -
                        50 *
                          Math.sin(((rotation + segmentSize) * Math.PI) / 180)
                      }%, ${50 + 50 * Math.cos((rotation * Math.PI) / 180)}% ${
                        50 - 50 * Math.sin((rotation * Math.PI) / 180)
                      }%)`,
                    }}
                  >
                    <div
                      className={`absolute top-0 left-1/2 -translate-x-1/2 ${getTextColor(
                        index
                      )} font-bold whitespace-nowrap text-center px-1`}
                      style={getTextStyle(index, items.length)}
                    >
                      {truncateText(item, items.length)}
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Centered result */}
            <AnimatePresence>
              {showResult && selectedItem && (
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <div className="bg-white rounded-full p-4 shadow-lg border-4 border-green-500 flex flex-col items-center justify-center w-40 h-40">
                    <p className="text-sm text-green-700 font-semibold">
                      Selected:
                    </p>
                    <p className="text-lg font-bold text-green-900 text-center">
                      {selectedItem}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <div className="w-full h-full rounded-full border-4 border-gray-300 flex items-center justify-center text-gray-500">
            {items.length === 0
              ? "Add items to spin the wheel"
              : "Need at least 2 items"}
          </div>
        )}

        {!showResult && items.length > 1 && !spinning && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 p-4 bg-black bg-opacity-20 rounded-full flex items-center justify-center text-white font-bold text-lg pointer-events-none">
            Click to Spin
          </div>
        )}
      </div>

      {spinning && <p className="text-gray-500 animate-pulse">Spinning...</p>}
    </div>
  );
}
