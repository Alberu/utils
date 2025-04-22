import { useEffect, useState } from "react";
import { calcTakeHome, generateSankeyData } from "@/utils/taxCalc";
import SalaryCard from "@/components/SalaryCard";
import ExpensesCard from "@/components/ExpensesCard";
import { ChevronRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import IncomeSankeyDiagram from "@/components/IncomeSankeyDiagram";
import { initialExpenses, initialTaxes } from "@/utils";
import { ImpactCard } from "@/components/ImpactCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const meta = {
  title: "Moneyflow",
  description: "Having trouble deciding? Use me!",
};

const MoneyFlow = () => {
  const [salary1, setSalary1] = useState(30000);
  // const [salary2, setSalary2] = useState(70000);
  const [taxes, setTaxes] = useState(initialTaxes);
  
  const [net, setNet] = useState(0);

  const [expenses, setExpenses] = useState(initialExpenses);

  const salary1Calcs = calcTakeHome(salary1);
  useEffect(()=>{
    // Calcualte all of the deductions that need to be made
    const taxesSum = taxes.reduce((sum, tax) => tax.active ? sum + tax.value : sum, 0);
    // Set the new net
    setNet(salary1 - taxesSum)
  }, [taxes, salary1])

  // NEED TO COME BACK TO THIS AND MAKE IT WORK
  const data = generateSankeyData(salary1Calcs, expenses)
  // console.log(data)

  return (
    <>
      <PageLayout>
        {/* <div className="container mx-auto px-4 py-8"> */}
        {/* <h1 className="text-2xl font-bold flex items-center"><a href='/'>Utils collection</a> <ChevronRight /> Money Flow</h1> */}
        <div className="space-y-4 w-full max-w-5xl">
          <SalaryCard
            title="Salary"
            calculations={salary1Calcs}
            salary={salary1}
            setSalary={setSalary1}
            taxes={taxes}
            setTaxes={setTaxes}
            net={net}
          />
          <ExpensesCard
            salary={net}
            expenses={expenses}
            setExpenses={setExpenses}
          />
          {/* <SalaryCard
                        title="Salary 2"
                        calculations={salary2Calcs}
                        salary={salary2}
                        setSalary={setSalary2}
                    /> */}
          <IncomeSankeyDiagram data={data}/>
          <ImpactCard expenses={expenses} />
        </div>
        {/* </div> */}
      </PageLayout>
    </>
  );
};

export default MoneyFlow;
