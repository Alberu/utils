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

  // const totalExpenses = Object.values(expenses).reduce((sum, expense) => sum + expense, 0)
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.value * occuraceMultiplier[expense.type],
    0
  );
  const leftOvers = salary / 12 - totalExpenses;

  // work out the total of the non percent boxes
  const totalNonPercentExpenses = expenses.reduce(
    (sum, expense) =>
      expense?.percent === false || expense.percent === null
        ? sum + expense?.value * occuraceMultiplier[expense?.type]
        : sum,
    0
  );

  const totalPercent = expenses.reduce((sum, expense) => sum + Number(expense?.percent), 0)

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
                    type: "Monthly",
                    name: "Other",
                    value: 200,
                    percent: false,
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
                    percent={expense?.percent}
                    category={expense?.category}
                  >
                    <BudgetSettings
                      expense={expense}
                      expenseIndex={expenseIndex}
                      handleUpdateExpense={handleUpdateExpense}
                      handleDeleteExpense={handleDeleteExpense}
                      budget={salary / 12}
                      totalNonPercentExpenses={totalNonPercentExpenses}
                      totalPercent={totalPercent}
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
