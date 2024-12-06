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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "./ui/slider";

export function BudgetSettings({
  expense,
  expenseIndex,
  handleDeleteExpense,
  handleUpdateExpense,
  budget,
  totalNonPercentExpenses,
  totalPercent,
}) {
  const handlePercentChange = (value) => {
    // need to check that the percent is valid
    if (totalPercent - expense?.percent + value > 100) {
      return;
    }
    handleUpdateExpense(expenseIndex, Number(value), "percent");
    const newValue = Number(value)/100 * (budget - totalNonPercentExpenses)
    handleUpdateExpense(expenseIndex, newValue, "value");
  };

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
      <Tabs
        defaultValue={expense?.percent ? "percent" : "value"} // change this to depend on the percent
        className="w-full"
        onValueChange={(value) => {
          console.log(value);
          // if set to value
          // set percent to null/false
          if (value == "value") {
            handleUpdateExpense(expenseIndex, false, "percent");
          }

          // if set to percent
          if (value == "percent") {
            // set the expense to monthly
            handleUpdateExpense(expenseIndex, "Monthly", "type");
            // work out the current percent of the value
            const expensePercent = (expense?.value / budget) * 100;
            // set that to be the percent
            handleUpdateExpense(expenseIndex, expensePercent, "percent");
          }

          // else do nothing
        }}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="value">Value</TabsTrigger>
          <TabsTrigger value="percent">Percent</TabsTrigger>
        </TabsList>
        <TabsContent value="value">
          Change the value.
          <div className="flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{expense?.type}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                  How often does this happen
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={expense?.type}
                  onValueChange={(value) => {
                    console.log(value);
                    handleUpdateExpense(expenseIndex, value, "type");
                  }}
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
                handleUpdateExpense(
                  expenseIndex,
                  Number(e.target.value),
                  "value"
                );
              }}
              className="w-full h-full px-4 py-2 text-right"
              step="25"
              min="0"
            />
          </div>
        </TabsContent>
        <TabsContent value="percent" className="space-y-2">
          <Slider
            value={[expense?.percent]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => {
              handlePercentChange(value[0]);
            }}
          />
          <Input
            type="number"
            value={expense?.percent}
            onChange={(e) => {
              handlePercentChange(e.target.value);
            }}
            className="w-full h-full px-4 py-2 text-right"
            step="25"
            min="0"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
