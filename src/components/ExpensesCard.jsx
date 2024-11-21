import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { Wallet, Activity } from "lucide-react"
import { Input } from "./ui/input"
import { Separator } from "./ui/separator"
import { Label } from "./ui/label"
import CircularPieChart from "./CircularPieChart"
import { Button } from "./ui/button"

const ExpensesCard = ({ salary, expenses, setExpenses }) => {
    const handleUpdateExpense = (expenseIndex, newValue) => {
        // setExpenses(prevExpenses => ({
        //     ...prevExpenses,
        //     [expense]: Number(newValue)
        // }))
        setExpenses(prevExpenses =>
            prevExpenses.map((expense, i) =>
                i === expenseIndex
                    ? { ...expense, value: newValue }
                    : expense
            )
        );
    }

    const handleAddExpense = () => {
        // setExpenses(prevExpenses => ({ ...prevExpenses, ['new expense']: 100 }))
        setExpenses(prevExpenses => ([...prevExpenses, { name: "hi", value: 200, colour: '#f00' }]))
    }

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
        setExpenses(prevExpenses => prevExpenses.filter((_, valIndex) => valIndex !== expenseIndex));
    }

    // const totalExpenses = Object.values(expenses).reduce((sum, expense) => sum + expense, 0)
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.value, 0)
    const leftOvers = salary / 12 - totalExpenses


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
                    <div className="items-center grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <Label className="text-sm text-muted-foreground">Budget</Label>
                                <p className="text-2xl font-bold">
                                    £{(salary / 12).toLocaleString()}
                                </p>
                            </div>
                            <Separator />
                            {expenses.map((expense, expsenseIndex) => {
                                console.log(expense)
                                return (
                                    <div key={expsenseIndex}>
                                        <Label className="capitalize text-sm text-muted-foreground">{expense?.name}</Label>
                                        <div className="flex gap-2 items-center">
                                            <Input
                                                type='number'
                                                value={expense?.value}
                                                onChange={(e) => { handleUpdateExpense(expsenseIndex, Number(e.target.value)) }} />
                                            <Button onClick={() => { handleDeleteExpense(expsenseIndex) }}>Delete</Button>
                                        </div>
                                    </div>
                                )
                            })}
                            <Button onClick={handleAddExpense}>Hi</Button>
                            <div>
                                <Label className="text-sm text-muted-foreground">Monthly Savings</Label>
                                <p className="text-2xl font-bold">
                                    £{leftOvers.toLocaleString()}
                                </p>
                            </div>
                        </div>
                        {leftOvers >= 0 && (
                            <CircularPieChart chartData={[...expenses, { name: "Left Overs", value: leftOvers, colour: '#2ECE2E' }]} />
                        )}
                        {leftOvers < 0 && (
                            <p><Activity/>Your bank is in critical condition. Mate, you ain't doing so good</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default ExpensesCard