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
import { formatCurrency } from "@/utils";
import { DisplayButton } from "./DisplayButton";

const ExpensesCard = ({ salary, expenses, setExpenses }) => {
  const handleUpdateExpense = (expenseIndex, newValue, type) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense, i) =>
        i === expenseIndex ? { ...expense, [type]: newValue } : expense
      )
    );
  };

  const handleAddExpense = (newExpense) => {
    // setExpenses(prevExpenses => ({ ...prevExpenses, ['new expense']: 100 }))
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const handleDeleteExpense = (expenseIndex) => {
    // setExpenses(prevExpenses => {
    //     const newExpenses = { ...prevExpenses };
    //     delete newExpenses[expense];
    //     return newExpenses;
    // });
    // setExpenses(prevExpenses => {
    //     const newExpenses = [...prevExpenses];
    //     newExpenses.filter((_, valIndex) => valIndex !== expenseIndex);
    //     return newExpenses;
    // });
    setExpenses((prevExpenses) =>
      prevExpenses.filter((_, valIndex) => valIndex !== expenseIndex)
    );
  };

  // const totalExpenses = Object.values(expenses).reduce((sum, expense) => sum + expense, 0)
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.value,
    0
  );
  const leftOvers = salary / 12 - totalExpenses;

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
                    name: "Other",
                    value: 200,
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
                    value={expense?.value}
                  >
                    <Input
                      // type="number"
                      value={expense?.name}
                      onChange={(e) => {
                        handleUpdateExpense(
                          expenseIndex,
                          e.target.value,
                          "name"
                        );
                      }}
                      // value={inputValues[expense.id]}
                      // onChange={(e) => handleInputChange(expense.id, e.target.value)}
                      className="w-full h-full px-4 py-2"
                    />
                    <ColourPicker
                      selectedColour={expense?.colour}
                      handleUpdateExpense={handleUpdateExpense}
                      expenseIndex={expenseIndex}
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
                      // value={inputValues[expense.id]}
                      // onChange={(e) => handleInputChange(expense.id, e.target.value)}
                      className="w-full h-full px-4 py-2 text-right"
                      step="25"
                      min="0"
                    />
                  </DisplayButton>
                );
              })}

              <Separator />

              <Button className="flex justify-between w-full" variant="ghost">
                <Label className="text-sm text-muted-foreground">Savings</Label>
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
