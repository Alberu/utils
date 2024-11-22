import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { Wallet, Activity, Trash2 } from "lucide-react"
import { Input } from "./ui/input"
import { Separator } from "./ui/separator"
import { Label } from "./ui/label"
import CircularPieChart from "./CircularPieChart"
import { Button } from "./ui/button"
import { AddExpense } from "./AddExpense"
import { ColourPicker } from "./ColourPicker"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { formatCurrency } from "@/utils"

const ExpensesCard = ({ salary, expenses, setExpenses }) => {
    const handleUpdateExpense = (expenseIndex, newValue, type) => {
        setExpenses(prevExpenses =>
            prevExpenses.map((expense, i) =>
                i === expenseIndex
                    ? { ...expense, [type]: newValue }
                    : expense
            )
        );
    }

    const handleAddExpense = (newExpense) => {
        // setExpenses(prevExpenses => ({ ...prevExpenses, ['new expense']: 100 }))
        setExpenses(prevExpenses => ([...prevExpenses, newExpense]))
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
                                    £{formatCurrency(salary / 12)}
                                </p>
                            </div>
                            <Separator />
                            <AddExpense handleAddExpense={handleAddExpense} />
                            {expenses.map((expense, expenseIndex) => {
                                console.log(expense)
                                return (
                                    <div key={expenseIndex}>
                                        {/* <Label className="capitalize text-sm text-muted-foreground">{expense?.name}</Label> */}
                                        <div className="flex gap-2 items-center">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant='ghost' style={{ color: expense?.colour }}>{expense?.name}</Button>
                                                    {/* <Label className='min-w-20'>{expense?.name}</Label> */}
                                                </PopoverTrigger>
                                                <PopoverContent side="right" align="center" className='w-auto'>
                                                    <div className="space-y-2">
                                                        <p className="text-sm text-muted-foreground">
                                                            Change the name of this expense.
                                                        </p>
                                                    <Input
                                                        value={expense?.name}
                                                        onChange={(e) => { handleUpdateExpense(expenseIndex, (e.target.value), 'name') }} />
                                                    </div>
                                                </PopoverContent>
                                            </Popover>

                                            <Input
                                                // className='border-none shadow-none' // something to keep in mind? which one looks better
                                                type='number'
                                                value={expense?.value}
                                                onChange={(e) => { handleUpdateExpense(expenseIndex, Number(e.target.value), 'value') }} />
                                            <ColourPicker selectedColour={expense?.colour} handleUpdateExpense={handleUpdateExpense} expenseIndex={expenseIndex} />
                                            <Button variant="outline" className='w-9 h-9' onClick={() => { handleDeleteExpense(expenseIndex) }}><Trash2 /></Button>
                                        </div>
                                    </div>
                                )
                            })}


                            <div>
                                <Label className="text-sm rounded-text-muted-foreground">Monthly Savings</Label>
                                <p className="text-2xl font-bold">
                                    £{formatCurrency(leftOvers)}
                                </p>
                            </div>
                        </div>
                        {leftOvers >= 0 && (
                            <CircularPieChart chartData={[...expenses, { name: "Left Overs", value: leftOvers, colour: '#2ECE2E' }]} />
                        )}
                        {leftOvers < 0 && (
                            <p><Activity />Your bank is in critical condition. Mate, you ain't doing so good</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default ExpensesCard