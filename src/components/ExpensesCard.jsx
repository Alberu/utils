import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Wallet, Activity, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import CircularPieChart from "./CircularPieChart";
import { Button } from "./ui/button";
import { AddExpense } from "./AddExpense";
import { ColourPicker } from "./ColourPicker";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { formatCurrency, occuraceMultiplier } from "@/utils";
import { DisplayButton } from "./DisplayButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BudgetSettings } from "./BudgetSettings";
import { useEffect, useState } from "react";

const ExpensesCard = ({ salary, expenses, setExpenses }) => {
  const handleUpdateExpense = (expenseIndex, newValue, type) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense, i) =>
        i === expenseIndex ? { ...expense, [type]: newValue } : expense
      )
    );
  };

  const handleAddExpense = (newExpense) => {
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const handleDeleteExpense = (expenseIndex) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((_, valIndex) => valIndex !== expenseIndex)
    );
  };

  const [totalExpenses, setTotalExpenses] = useState(0);
  const [leftOvers, setLeftOvers] = useState(0);
  const [totalNonPercentExpenses, setTotalNonPercentExpenses] = useState(0);
  const [totalPercent, setTotalPercent] = useState(0);

  // Invoke when the a change happens in the expenses or salary
  useEffect(() => {
    // calcualte the new total
    const newTotalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.value * occuraceMultiplier[expense.type],
      0
    );
    setTotalExpenses(newTotalExpenses);

    // calcualte the new leftovers
    const newLeftOvers = salary / 12 - newTotalExpenses;
    setLeftOvers(newLeftOvers);

    // work out the total of the non percent boxes
    const newTotalNonPercentExpenses = expenses.reduce(
      (sum, expense) =>
        expense?.isPercent === false || expense.isPercent === null
          ? sum + expense?.value * occuraceMultiplier[expense?.type]
          : sum,
      0
    );
    setTotalNonPercentExpenses(newTotalNonPercentExpenses);
    
    // update any other percent entries
    expenses.forEach((expense, expenseIndex) => {
        if (expense.isPercent !== null && expense.isPercent !== false) {
          const newValue =
            (expense.isPercent / 100) *
            (salary / 12 - newTotalNonPercentExpenses);
          // make sure that this value doesn't just get updated uneccesarily so that it doens't just get rerendered
          if (expense.value !== newValue) {
            handleUpdateExpense(expenseIndex, newValue, "value");
          }
        }
      });

    // THIS ISN'T BEING USED AT THE MOMNET, BRING THIS BACK AT SOME POINT?
    setTotalPercent(
      expenses.reduce((sum, expense) => sum + Number(expense?.isPercent), 0)
    );
  }, [salary, expenses]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Monthly Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="items-start grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col justify-center">
              <Button
                variant="outline"
                onClick={() => {
                  handleAddExpense({
                    category: "Essential",
                    type: "Monthly",
                    name: "Other",
                    value: 200,
                    isPercent: false,
                    colour: "#ABAA99",
                  });
                }}
              >
                Add another expense
              </Button>
              {/* <AddExpense handleAddExpense={handleAddExpense} /> */}
              <Button className="flex justify-between w-full" variant="ghost">
                <Label className="text-sm text-muted-foreground">Budget</Label>
                <p className="text-xl font-bold">
                  £{formatCurrency(salary / 12)}
                </p>
              </Button>

              <Separator />

              {expenses.map((expense, expenseIndex) => {
                return (
                  <DisplayButton
                    key={expenseIndex}
                    name={expense?.name}
                    colour={expense?.colour}
                    value={expense?.value * occuraceMultiplier[expense?.type]}
                    percent={expense?.isPercent}
                    category={expense?.category}
                  >
                    <BudgetSettings
                      expense={expense}
                      expenseIndex={expenseIndex}
                      handleUpdateExpense={handleUpdateExpense}
                      handleDeleteExpense={handleDeleteExpense}
                      budget={salary / 12}
                      totalNonPercentExpenses={totalNonPercentExpenses}
                      //   totalPercent={totalPercent}
                      //   totalNonPercentExpenses={1000}
                      //   totalPercent={0}
                    />
                  </DisplayButton>
                );
              })}

              <Separator />

              <Button className="flex justify-between w-full" variant="ghost">
                <Label className="text-sm text-muted-foreground">
                  Left overs
                </Label>
                <p className="text-xl font-bold">
                  £{formatCurrency(leftOvers)}
                </p>
              </Button>
            </div>

            {leftOvers >= 0 && (
              <CircularPieChart
                chartData={[
                  ...expenses,
                  { name: "Left Overs", value: leftOvers, colour: "#2ECE2E" },
                ]}
              />
            )}
            {leftOvers < 0 && (
              <p>
                <Activity />
                Your bank is in critical condition. Mate, you ain't doing so
                good
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ExpensesCard;
