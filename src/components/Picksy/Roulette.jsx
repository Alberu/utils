import AutoTextArea from "../AutoTextArea";
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { ArrowDown } from "lucide-react"

export const meta = {
  title: "Roulette",
  description: "Write a description here",
};

export default function Roulette() {
  const [rouletteList, setRouletteList] = useState("")
  const [items, setItems] = useState([])
  const [spinning, setSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [selectedItem, setSelectedItem] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const wheelRef = useRef(null)

  // Parse the input text into an array of items
  useEffect(() => {
    const values = rouletteList.split(/\r?\n/).filter((item) => item.trim() !== "")
    setItems(values)
  }, [rouletteList])

  const handleRouletteList = (value) => {
    setRouletteList(value)
  }

  const spinWheel = () => {
    if (spinning || items.length <= 1) return

    setSpinning(true)
    setSelectedItem(null)
    setShowResult(false)

    // Calculate a random stopping point (5-10 full rotations plus a random segment)
    const spinDuration = 5 + Math.random() * 3
    const fullRotations = Math.floor(5 + Math.random() * 5) * 360
    const randomAngle = Math.floor(Math.random() * 360)
    const newRotation = rotation + fullRotations + randomAngle

    setRotation(newRotation)

    // Calculate which item will be selected based on the final rotation
    setTimeout(() => {
      const normalizedRotation = newRotation % 360
      const segmentSize = 360 / items.length
      const selectedIndex = items.length - 1 - Math.floor(normalizedRotation / segmentSize)
      const actualIndex = selectedIndex % items.length
      setSelectedItem(items[actualIndex])
      setSpinning(false)
      setShowResult(true)
    }, spinDuration * 1000)
  }

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
    ]
    return colors[index % colors.length]
  }

  // Get text color based on background color
  const getTextColor = (index) => {
    // For better readability - white on all colors
    return "text-white"
  }

  // Calculate segment path for proper sector rendering
  const createWheelSegments = (numSegments) => {
    const segments = []
    const angleSize = 360 / numSegments
    
    for (let i = 0; i < numSegments; i++) {
      const startAngle = i * angleSize
      const endAngle = (i + 1) * angleSize
      
      const segment = {
        index: i,
        color: getSegmentColor(i),
        startDeg: startAngle,
        endDeg: endAngle,
        style: {
          transform: `rotate(${startAngle}deg)`,
          transformOrigin: "center",
          position: "absolute",
          width: "50%",
          height: "50%",
          left: "50%",
          top: "0%",
          clipPath: `polygon(0 0, 100% 0, 0 100%)`,
          transform: `rotate(${startAngle}deg)`,
        }
      }
      
      segments.push(segment)
    }
    
    return segments
  }

  // Calculate text position and size dynamically
  const getTextStyle = (index, itemsCount) => {
    const segmentSize = 360 / itemsCount
    const rotation = index * segmentSize
    
    // Adjust text position based on number of segments
    const distanceFactor = itemsCount <= 4 ? 60 : 
                          itemsCount <= 8 ? 55 :
                          itemsCount <= 12 ? 45 : 35
    
    return {
      transform: `rotate(${segmentSize / 2}deg) translateY(-${distanceFactor}%)`,
    }
  }

  // Truncate text based on number of items
  const truncateText = (text, itemsCount) => {
    if (itemsCount <= 4) {
      return text.length > 20 ? `${text.substring(0, 17)}...` : text
    } else if (itemsCount <= 8) {
      return text.length > 15 ? `${text.substring(0, 12)}...` : text
    } else if (itemsCount <= 12) {
      return text.length > 10 ? `${text.substring(0, 7)}...` : text
    } else {
      return text.length > 6 ? `${text.substring(0, 3)}...` : text
    }
  }

  const wheelSegments = items.length > 1 ? createWheelSegments(items.length) : []

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-4 space-y-6">
      <AutoTextArea value={rouletteList} onChange={handleRouletteList} />
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
              className={`w-full h-full rounded-full overflow-hidden border-4 border-gray-500 relative ${!spinning && items.length > 1 ? 'cursor-pointer hover:opacity-90 hover:shadow-lg transition-all' : ''}`}
              animate={{ rotate: rotation }}
              transition={{ duration: spinning ? 5 + Math.random() * 3 : 0, ease: "easeOut" }}
              onClick={!spinning && items.length > 1 ? spinWheel : undefined}
            >
              {/* Circle divisions using SVG */}
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <defs>
                  {items.map((_, index) => (
                    <clipPath key={`clip-${index}`} id={`sector-clip-${index}`}>
                      {/* Calculate sector path */}
                      <path
                        d={(() => {
                          const segmentSize = 360 / items.length;
                          const startAngle = index * segmentSize;
                          const endAngle = (index + 1) * segmentSize;
                          
                          // Convert degrees to radians for trig functions
                          const startRad = (startAngle * Math.PI) / 180;
                          const endRad = (endAngle * Math.PI) / 180;
                          
                          // Calculate points
                          const x1 = 50 + 50 * Math.sin(startRad);
                          const y1 = 50 - 50 * Math.cos(startRad);
                          const x2 = 50 + 50 * Math.sin(endRad);
                          const y2 = 50 - 50 * Math.cos(endRad);
                          
                          // Generate path - M=Move to, L=Line to, A=Arc
                          // Large arc flag is 0 for <180 degrees, 1 for >180 degrees
                          // "0 0 1" maintains the counter-clockwise definition
                          return `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;
                        })()}
                      />
                    </clipPath>
                  ))}
                </defs>
                
                {items.map((item, index) => {
                  const segmentSize = 360 / items.length;
                  const midAngle = index * segmentSize + segmentSize / 2;
                  const midRad = (midAngle * Math.PI) / 180;
                  // Calculate text position - halfway between the center and the edge
                  const textDistanceFactor = items.length <= 4 ? 0.6 : 
                                            items.length <= 8 ? 0.55 :
                                            items.length <= 12 ? 0.5 : 0.45;
                  const textX = 50 + textDistanceFactor * 50 * Math.sin(midRad);
                  const textY = 50 - textDistanceFactor * 50 * Math.cos(midRad);
                  
                  return (
                    <g key={index}>
                      {/* Sector */}
                      <g clipPath={`url(#sector-clip-${index})`}>
                        <rect
                          x="0"
                          y="0"
                          width="100"
                          height="100"
                          fill={getSegmentColor(index).replace('bg-', '').replace('-500', '')}
                        />
                      </g>
                      
                      {/* Text */}
                      <text
                        x={textX}
                        y={textY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="white"
                        fontWeight="bold"
                        fontSize={items.length <= 6 ? "9" : items.length <= 12 ? "2.5" : "2"}
                        transform={`rotate(${midAngle}, ${textX}, ${textY})`}
                        style={{ transform: `rotate(90deg at ${textX}px ${textY}px)` }}
                      >
                        {truncateText(item, items.length)}
                      </text>
                    </g>
                  );
                })}
              </svg>
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
                  <div className="bg-white rounded-full p-4 shadow-lg border-4 border-gray-500 flex flex-col items-center justify-center w-40 h-40">
                    <p className="text-sm text-black font-semibold">Selected:</p>
                    <p className="text-lg font-bold text-black text-center">{selectedItem}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <div className="w-full h-full rounded-full border-4 border-gray-300 flex items-center justify-center text-gray-500">
            {items.length === 0 ? "Add items to spin the wheel" : "Need at least 2 items"}
          </div>
        )}

        {!showResult && items.length > 1 && !spinning && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 p-4 bg-black bg-opacity-20 rounded-full flex items-center justify-center text-white font-bold text-lg pointer-events-none">
            Click to Spin
          </div>
        )}
      </div>

      {spinning && (
        <p className="text-gray-500 animate-pulse">Spinning...</p>
      )}
    </div>
  )
}