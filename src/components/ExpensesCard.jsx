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
    // const handleUpdateExpense = (expenseIndex, newValue, type) => {
    //     setExpenses(prevExpenses =>
    //         prevExpenses.map((expense, i) =>
    //             i === expenseIndex
    //                 ? { ...expense, [type]: newValue }
    //                 : expense
    //         )
    //     );
    // }

    // const handleAddExpense = (newExpense) => {
    //     setExpenses(prevExpenses => ([...prevExpenses, newExpense]))
    // }

    // const handleDeleteExpense = (expenseIndex) => {
    //     setExpenses(prevExpenses => prevExpenses.filter((_, valIndex) => valIndex !== expenseIndex));
    // }
    const handleUpdateExpense = (expenseIndex, newValue, type, sectionName='budget') => {
        setExpenses(prevFinances =>
            prevFinances.map(section => {
                if (section.name === sectionName) {
                    return {
                        ...section,
                        children: section.children.map((expense, i) =>
                            i === expenseIndex
                                ? { ...expense, [type]: newValue }
                                : expense
                        )
                    };
                }
                return section;
            })
        );
    }

    const handleAddExpense = (newExpense, sectionName='budget') => {
        setExpenses(prevFinances =>
            prevFinances.map(section =>
                section.name === sectionName
                    ? {
                        ...section,
                        children: [...section.children, newExpense],
                        value: section.value + newExpense.value
                    }
                    : section
            )
        );
    }

    const handleDeleteExpense = (expenseIndex, sectionName='budget') => {
        setExpenses(prevFinances =>
            prevFinances.map(section => {
                if (section.name === sectionName) {
                    const deletedExpense = section.children[expenseIndex];
                    return {
                        ...section,
                        children: section.children.filter((_, valIndex) => valIndex !== expenseIndex),
                        value: section.value - deletedExpense.value
                    };
                }
                return section;
            })
        );
    }

    // const totalExpenses = Object.values(expenses).reduce((sum, expense) => sum + expense, 0)
    const totalExpenses = expenses[3]?.children.reduce((sum, expense) => sum + expense.value, 0)
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
                    <div className="items-start grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col justify-center">
                            <Button variant="outline" onClick={() => { handleAddExpense({ name: "Other", value: 200, colour: '#ABAA99' }) }}>Add another expense</Button>
                            {/* <AddExpense handleAddExpense={handleAddExpense} /> */}
                            <Button className='flex justify-between w-full' variant='ghost'>
                                <Label className="text-sm text-muted-foreground">Budget</Label>
                                <p className="text-xl font-bold">
                                    £{formatCurrency(salary / 12)}
                                </p>
                            </Button>

                            <Separator />

                            {expenses[3]?.children.map((expense, expenseIndex) => {
                                return (
                                    <Popover key={expenseIndex}>
                                        <PopoverTrigger asChild>

                                            <Button className='flex justify-between w-full' variant='ghost'>
                                                <div className="flex items-center gap-2">
                                                    <Label className="text-sm text-muted-foreground">{expense?.name}</Label>
                                                    <span className="w-4 h-4 rounded-sm" style={{ backgroundColor: expense?.colour }}></span>
                                                </div>
                                                <p className="text-xl font-light">
                                                    {formatCurrency(expense?.value)}
                                                </p>
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className='flex'>
                                            <Input
                                                // type="number"
                                                value={expense?.name}
                                                onChange={(e) => { handleUpdateExpense(expenseIndex, (e.target.value), 'name') }}
                                                // value={inputValues[expense.id]}
                                                // onChange={(e) => handleInputChange(expense.id, e.target.value)}
                                                className="w-full h-full px-4 py-2"
                                            />
                                            <ColourPicker selectedColour={expense?.colour} handleUpdateExpense={handleUpdateExpense} expenseIndex={expenseIndex} />
                                            <Button variant="outline" className='w-9 h-9' onClick={() => { handleDeleteExpense(expenseIndex) }}><Trash2 /></Button>
                                            <Input
                                                type="number"
                                                value={expense?.value}
                                                onChange={(e) => { handleUpdateExpense(expenseIndex, Number(e.target.value), 'value') }}
                                                // value={inputValues[expense.id]}
                                                // onChange={(e) => handleInputChange(expense.id, e.target.value)}
                                                className="w-full h-full px-4 py-2 text-right"
                                                step="25"
                                                min="0"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                )
                            })}

                            <Separator />

                            <Button className='flex justify-between w-full' variant='ghost'>
                                <Label className="text-sm text-muted-foreground">Savings</Label>
                                <p className="text-xl font-bold">
                                    £{formatCurrency(leftOvers)}
                                </p>
                            </Button>
                        </div>

                        {leftOvers >= 0 && (
                            <CircularPieChart chartData={[...expenses[3]?.children, { name: "Left Overs", value: leftOvers, colour: '#2ECE2E' }]} />
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