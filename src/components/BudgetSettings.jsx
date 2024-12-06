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
  //   totalPercent,
}) {
  const handlePercentChange = (value) => {
    // add a way to check if the total percent is over 100?
    handleUpdateExpense(expenseIndex, Number(value), "isPercent");
    const newValue = (Number(value) / 100) * (budget - totalNonPercentExpenses);
    handleUpdateExpense(expenseIndex, newValue, "value");
  };

  const FlexBox = ({ children }) => <div className="flex gap-2">{children}</div>;
  const flexBoxDiv = "flex gap-2"

  return (
    <div className="space-y-2">
      <div className={flexBoxDiv}>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full" asChild>
            <Button variant="outline">
              <span className="text-muted-foreground">Category:</span>
              <span style={{color: initialCategories[expense?.category]}}>{expense?.category}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {/* <DropdownMenuLabel>to be done!</DropdownMenuLabel> */}
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuRadioGroup
              value={expense?.category}
              onValueChange={(value) => {
                // change the category of this expense
                handleUpdateExpense(expenseIndex, value, "category");
                // change the colour of this expense to the one set of the category
                // handleUpdateExpense(expenseIndex, initialCategories[value], "colour");
              }}
            >
              {Object.keys(initialCategories).map((item, itemIndex) => (
                <DropdownMenuRadioItem key={itemIndex} value={item} style={{color: initialCategories[item]}}>
                  {item}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <ColourPicker
          selectedColour={expense?.colour}
          handleUpdateExpense={handleUpdateExpense}
          expenseIndex={expenseIndex}
        />
        </div>
      <div className={flexBoxDiv}>
        <Input
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
        defaultValue={expense?.isPercent ? "percent" : "value"} // change this to depend on the percent
        className="w-full bg-muted p-1 rounded-lg"
        onValueChange={(value) => {
          // if set to value
          // set percent to null/false
          if (value == "value") {
            handleUpdateExpense(expenseIndex, false, "isPercent");
          }

          // if set to percent
          if (value == "percent") {
            // set the expense to monthly
            handleUpdateExpense(expenseIndex, "Monthly", "type");
            // work out the current percent of the value
            const expensePercent =
              ((expense?.value * occuraceMultiplier[expense?.type]) / budget) *
              100;
            // set that to be the percent
            handleUpdateExpense(expenseIndex, expensePercent, "isPercent");
            // also update the value
            handleUpdateExpense(
              expenseIndex,
              expense?.value * occuraceMultiplier[expense?.type],
              "value"
            );
          }

          // else do nothing
        }}
      >
        <TabsList className="grid w-full grid-cols-2 p-0 m-0">
          <TabsTrigger value="value" className="h-full p-0 m-0">
            Value
          </TabsTrigger>
          <TabsTrigger value="percent" className="h-full p-0 m-0">
            Percent
          </TabsTrigger>
        </TabsList>
        <TabsContent value="value">
            <div className={flexBoxDiv}>
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
            value={[expense?.isPercent]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => {
              handlePercentChange(value[0]);
            }}
          />
          <Input
            type="number"
            value={expense?.isPercent}
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
