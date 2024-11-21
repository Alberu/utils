import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"

export function AddExpense({ handleAddExpense }) {
    const [newExpense, setNewExpense] = useState({ name: "Other", value: 200, colour: '#f00' })

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">Add another expense</Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">New Expense</h4>
                        <p className="text-sm text-muted-foreground">
                            Set the name for this new expense and its initial value.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label>Name</Label>
                            <Input
                                id="width"
                                value={newExpense?.name}
                                className="col-span-2 h-8"
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="maxWidth">Value</Label>
                            <Input
                                id="maxWidth"
                                defaultValue="300px"
                                className="col-span-2 h-8"
                            />
                        </div>
                    </div>
                    <Button onClick={() => { handleAddExpense(newExpense) }}>Add expense</Button>

                </div>
            </PopoverContent>
        </Popover>
    )
}
