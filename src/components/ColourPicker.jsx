import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { useState } from "react"
import { Button } from "./ui/button"
import { Pipette } from "lucide-react"

const colours = [
    '#f00', '#FA961F', '#000', '#2ECE2E',
]

export function ColourPicker({ selectedColour, handleUpdateExpense, expenseIndex }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='outline' className='w-9 h-9' style={{ backgroundColor: selectedColour }}>
                    <Pipette />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
                <div className="grid grid-cols-3 gap-2">
                    {colours.map((colour) => (
                        <button
                            key={colour}
                            className="w-8 h-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-400"
                            style={{ backgroundColor: colour }}
                            onClick={() => handleUpdateExpense(expenseIndex, colour, 'colour')}
                        />
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}

