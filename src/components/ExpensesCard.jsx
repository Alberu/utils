import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { Wallet } from "lucide-react"
import { Input } from "./ui/input"


const ExpensesCard = ({ salary, expenses, setExpenses }) => {
    const handleExpenseChange = (expense, newValue) => {
        setExpenses(prevExpenses => ({
            ...prevExpenses,
            [expense]: Number(newValue) 
        }))
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Wallet className="h-5 w-5" />
                        Monthly Expenses {salary/12}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {Object.keys(expenses).map((expense) => {
                        return (
                            <div key={expense} className="flex gap-2 items-center">
                                <label className="capitalize">{expense}</label>
                                <Input
                                    type='number'
                                    value={expenses[expense]}
                                    onChange={(e) => {handleExpenseChange(expense, e.target.value)}} />
                            </div>
                        )
                    })}
                    <div>
                        <span>Total left</span>
                    </div>

                </CardContent>
            </Card>
        </>
    )
}

export default ExpensesCard