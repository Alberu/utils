import { Trash2 } from "lucide-react";
import { ColourPicker } from "./ColourPicker";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export function BudgetSettings({
  expense,
  expenseIndex,
  handleDeleteExpense,
  handleUpdateExpense,
}) {
  const [occurance, setOccurance] = useState("Monthly");
  const occuraces = ["Monthly", "Weekly", "Daily", "Custom"];
  return (
    <div>
      <div className="flex">
        <Input
          // type="number"
          value={expense?.category}
          onChange={(e) => {
            handleUpdateExpense(expenseIndex, e.target.value, "category");
          }}
          className="w-full h-full px-4 py-2"
        />
        <ColourPicker
          selectedColour={expense?.colour}
          handleUpdateExpense={handleUpdateExpense}
          expenseIndex={expenseIndex}
        />
      </div>
      <div className="flex">
        <Input
          // type="number"
          value={expense?.name}
          onChange={(e) => {
            handleUpdateExpense(expenseIndex, e.target.value, "name");
          }}
          className="w-full h-full px-4 py-2"
        />
        <Button
          variant="outline"
          className="w-9 h-9"
          onClick={() => {
            handleDeleteExpense(expenseIndex);
          }}
        >
          <Trash2 />
        </Button>
      </div>
      <div className="flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{occurance}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>How often does this happen</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={occurance}
              onValueChange={setOccurance}
            >
              {occuraces.map((item, itemIndex) => (
                <DropdownMenuRadioItem key={itemIndex} value={item}>
                  {item}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          type="number"
          value={expense?.value}
          onChange={(e) => {
            handleUpdateExpense(expenseIndex, Number(e.target.value), "value");
          }}
          className="w-full h-full px-4 py-2 text-right"
          step="25"
          min="0"
        />
      </div>
    </div>
  );
}