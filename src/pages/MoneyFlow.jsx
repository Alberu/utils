import { useEffect, useState } from "react";
import { calcIncomeTax, calcTakeHome } from "@/utils/taxCalc";
import SalaryCard from "@/components/SalaryCard";
import ExpensesCard from "@/components/ExpensesCard";
import { ChevronRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import IncomeSankeyDiagram from "@/components/IncomeSankeyDiagram";
import { finances as initialFinances } from "@/utils";

const MoneyFlow = () => {
  const [salary1, setSalary1] = useState(30000);
  // const [salary2, setSalary2] = useState(70000);
  const [finances, setFinances] = useState(initialFinances);

  const [expenses, setExpenses] = useState([
    { name: "Rent", value: 1000, colour: "#FA961F" },
    { name: "Food", value: 300, colour: "#ABAA99" },
    { name: "Other", value: 200, colour: "#f00" },
  ]);

  const handleUpdateChildren = (
    expenseIndex,
    newValue,
    type,
    sectionName = "budget"
  ) => {
    setFinances((prevFinances) =>
      prevFinances.map((section) => {
        if (section.name === sectionName) {
          return {
            ...section,
            children: section.children.map((expense, i) =>
              i === expenseIndex ? { ...expense, [type]: newValue } : expense
            ),
          };
        }
        return section;
      })
    );
  };

  const handleAddChildren = (newExpense, sectionName = "budget") => {
    setFinances((prevFinances) =>
      prevFinances.map((section) =>
        section.name === sectionName
          ? {
              ...section,
              children: [...section.children, newExpense],
              value: section.value + newExpense.value,
            }
          : section
      )
    );
  };

  const handleDeleteChildren = (expenseIndex, sectionName = "budget") => {
    setFinances((prevFinances) =>
      prevFinances.map((section) => {
        if (section.name === sectionName) {
          const deletedExpense = section.children[expenseIndex];
          return {
            ...section,
            children: section.children.filter(
              (_, valIndex) => valIndex !== expenseIndex
            ),
            value: section.value - deletedExpense.value,
          };
        }
        return section;
      })
    );
  };

  useEffect(() => {
    console.log(finances);
    console.log(finances[0].value)
    handleUpdateChildren(0, calcIncomeTax(finances[0].value), "value", "tax");
  }, [finances[0].children[0].value]);
  // calcualte the how much money you get to take home
  const salary1Calcs = calcTakeHome(salary1);

  return (
    <>
      <PageLayout>
        {/* <div className="container mx-auto px-4 py-8"> */}
        {/* <h1 className="text-2xl font-bold flex items-center"><a href='/'>Utils collection</a> <ChevronRight /> Money Flow</h1> */}
        <div className="space-y-4 w-max">
          <SalaryCard
            title="Salary"
            calculations={salary1Calcs}
            salary={salary1}
            setSalary={setSalary1}
            finances={finances}
            handleUpdateChildren={handleUpdateChildren}
            handleAddChildren={handleAddChildren}
            handleDeleteChildren={handleDeleteChildren}
          />
          <ExpensesCard
            salary={salary1Calcs?.net}
            finances={finances}
            // setExpenses={setFinances}
            handleUpdateChildren={handleUpdateChildren}
            handleAddChildren={handleAddChildren}
            handleDeleteChildren={handleDeleteChildren}
          />
          {/* <SalaryCard
                        title="Salary 2"
                        calculations={salary2Calcs}
                        salary={salary2}
                        setSalary={setSalary2}
                    /> */}
          <IncomeSankeyDiagram />
        </div>
        {/* </div> */}
      </PageLayout>
    </>
  );
};

export default MoneyFlow;
