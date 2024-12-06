import ExpensesCard from "@/components/ExpensesCard";

// setup tax bands
const taxBands = [
    { threshold: 12570, rate: 0 },
    { threshold: 50270, rate: 0.2 },
    { threshold: 125140, rate: 0.4 },
    { threshold: Infinity, rate: 0.45 },
];

const niBands = [
    { threshold: 12570, rate: 0 },
    { threshold: 50270, rate: 0.12 },
    { threshold: Infinity, rate: 0.02 },
];

const calcIncomeTax = (income) => {
    let remainingIncome = income;
    let totalTax = 0;
    let previousThreshold = 0;

    for (const band of taxBands) {
        const taxableAtThisBand = Math.min(
            Math.max(remainingIncome - previousThreshold, 0),
            band.threshold - previousThreshold
        );
        totalTax += taxableAtThisBand * band.rate;
        previousThreshold = band.threshold;
    }

    return totalTax;
};

const calcNI = (income) => {
    let remainingIncome = income;
    let totalNI = 0;
    let previousThreshold = 0;

    for (const band of niBands) {
        const taxableAtThisBand = Math.min(
            Math.max(remainingIncome - previousThreshold, 0),
            band.threshold - previousThreshold
        );
        totalNI += taxableAtThisBand * band.rate;
        previousThreshold = band.threshold;
    }

    return totalNI;
};

const calcTakeHome = (salary) => {
    const incomeTax = calcIncomeTax(salary);
    const ni = calcNI(salary);
    return {
        gross: salary,
        incomeTax,
        ni,
        net: salary - incomeTax - ni,
    };
};

// Need to come back to this and make it work
export function generateSankeyData(salaryCalcs, expenses) {
    // Setup initial nodes
    const nodes = [
        { id: "Salary", color: "#f00" },
        { id: "National Insurance", color: "#2ECE2E" },
        { id: "Income Tax", color: "#ABAA99" },
        { id: "Net Income", color: "#FA961F" },
        { id: "Expenses", color: "#FA961F" }
    ];

    // Add expense categories and specific expenses to nodes
    const expenseCategories = [...new Set(expenses.map(expense => expense.category))];
    expenseCategories.forEach(category => {
        nodes.push({ id: category, color: "#FA961F" });
    });

    expenses.forEach(expense => {
        nodes.push({ id: expense.name, color: expense.colour });
    });

    // Prepare the links
    const links = [
        { source: "Salary", target: "National Insurance", value: salaryCalcs.ni / 12 },
        { source: "Salary", target: "Income Tax", value: salaryCalcs.incomeTax / 12 },
        { source: "Salary", target: "Net Income", value: salaryCalcs.net / 12 }
    ];

    // Net Income to Expenses
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.value, 0);

    // const netIncomeToEpensesRatio = 1;
    links.push({
        source: "Net Income",
        target: "Expenses",
        value: totalExpenses
    });

    // Expenses to Categories
    const expenseCategoryTotals = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.value;
        return acc;
    }, {});

    Object.entries(expenseCategoryTotals).forEach(([category, categoryTotal]) => {
            links.push({
                source: "Expenses",
                target: category,
                value: categoryTotal
            });
    });

    // Expenses Categories to Specific Expenses
    expenses.forEach(expense => {
        // temp solve for this (NEED TO COME BACK TO THIS)
        if (expense.category !== expense.name) {
            links.push({
                source: expense.category,
                target: expense.name,
                value: expense.value
            });
        }
    });

    return { nodes, links };
}

export { taxBands, niBands, calcIncomeTax, calcNI, calcTakeHome }