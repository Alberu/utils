import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { Wallet } from "lucide-react"
import { Input } from "./ui/input"
import { Separator } from "./ui/separator"
import { Label } from "./ui/label"


const ExpensesCard = ({ salary, expenses, setExpenses }) => {
    const handleExpenseChange = (expense, newValue) => {
        setExpenses(prevExpenses => ({
            ...prevExpenses,
            [expense]: Number(newValue)
        }))
    }

    const totalExpenses = Object.values(expenses).reduce((sum, expense) => sum + expense, 0)
    const leftOvers = salary / 12 - totalExpenses

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Wallet className="h-5 w-5" />
                        Monthly Expenses {salary / 12}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <Label className="text-sm text-muted-foreground">Budget</Label>
                            <p className="text-2xl font-bold">
                                £{(salary / 12).toLocaleString()}
                            </p>
                        </div>
                        <Separator />
                        {Object.keys(expenses).map((expense) => {
                            return (
                                <div key={expense}>
                                    <Label className="capitalize text-sm text-muted-foreground">{expense}</Label>
                                    <div className="flex gap-2 items-center">
                                        <Input
                                            type='number'
                                            value={expenses[expense]}
                                            onChange={(e) => { handleExpenseChange(expense, e.target.value) }} />
                                    </div>
                                </div>
                            )
                        })}
                        <div>
                            <Label className="text-sm text-muted-foreground">Monthly Savings</Label>
                            <p className="text-2xl font-bold">
                                £{leftOvers.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default ExpensesCard