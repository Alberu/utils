import { useState } from "react";
import { calcTakeHome } from "@/utils/taxCalc";
import SalaryCard from "@/components/SalaryCard";
import ExpensesCard from "@/components/ExpensesCard";
import { ChevronRight } from "lucide-react";
import CircularPieChart from "@/components/CircularPieChart";

const MoneyFlow = () => {
    const [salary1, setSalary1] = useState(30000);
    const [salary2, setSalary2] = useState(70000);

    const [expenses, setExpenses] = useState({
        rent: 1000,
        food: 300,
        other: 200,
    })

    const salary1Calcs = calcTakeHome(salary1);
    const salary2Calcs = calcTakeHome(salary2);

    console.log(salary1Calcs)

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold flex items-center"><a href='/'>Utils collection</a> <ChevronRight /> Money Flow</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SalaryCard
                        title="Salary 1"
                        calculations={salary1Calcs}
                        salary={salary1}
                        setSalary={setSalary1}
                    />
                    <CircularPieChart chartData={[
                        { name: "Income Tax", value: salary1Calcs.incomeTax },
                        { name: "National Insurance", value: salary1Calcs.ni },
                        { name: "Take Home Pay", value: salary1Calcs.net },
                    ]} />
                    <ExpensesCard salary={salary1Calcs?.net} expenses={expenses} setExpenses={setExpenses} />
                    <SalaryCard
                        title="Salary 2"
                        calculations={salary2Calcs}
                        salary={salary2}
                        setSalary={setSalary2}
                    />
                </div>
            </div>

        </>
    );
};

export default MoneyFlow;