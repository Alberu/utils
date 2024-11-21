import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { useState } from "react"
import { Button } from "./ui/button"
import { Pipette } from "lucide-react"

const colors = [
  '#f00', '#FA961F', '#000',
]

export function ColourPicker() {
  const [selectedColor, setSelectedColor] = useState(colors[0])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' className='w-9 h-9' style={{ color: selectedColor }}><Pipette/></Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <div className="grid grid-cols-3 gap-2">
          {colors.map((color) => (
            <button
              key={color}
              className="w-8 h-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-400"
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
              aria-label={`Select ${color}`}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

