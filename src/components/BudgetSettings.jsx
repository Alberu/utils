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
import { initialCategories, occuraceMultiplier } from "@/utils";

export function BudgetSettings({
  expense,
  expenseIndex,
  handleDeleteExpense,
  handleUpdateExpense,
}) {
  const occuraces = ["monthly", "weekly", "daily", "custom"];
  return (
    <div className="space-y-1">
      <div className="flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{expense?.category}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>to be done!</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={expense?.category}
              onValueChange={(value) => {
                handleUpdateExpense(expenseIndex, value, "category");
              }}
            >
              {initialCategories.map((item, itemIndex) => (
                <DropdownMenuRadioItem key={itemIndex} value={item}>
                  {item}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <Input
          // type="number"
          value={expense?.category}
          onChange={(e) => {
            handleUpdateExpense(expenseIndex, e.target.value, "category");
          }}
          className="w-full h-full px-4 py-2"
        /> */}
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
            <Button variant="outline">{expense?.type}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>How often does this happen</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={expense?.type}
              onValueChange={(value) => {
                console.log(value);
                handleUpdateExpense(expenseIndex, value, "type");
              }}
              //   onValueChange={setOccurance}
            >
              {Object.keys(occuraceMultiplier).map((item, itemIndex) => (
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
