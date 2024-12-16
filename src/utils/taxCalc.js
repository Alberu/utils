
// setup tax bands
export const taxBands = [
    { threshold: 12570, rate: 0 },
    { threshold: 50270, rate: 0.2 },
    { threshold: 125140, rate: 0.4 },
    { threshold: Infinity, rate: 0.45 },
];

export const niBands = [
    { threshold: 12570, rate: 0 },
    { threshold: 50270, rate: 0.12 },
    { threshold: Infinity, rate: 0.02 },
];

export const studentFinanceBands = [
    { threshold: 27295, rate: 0 }, // No repayment below this threshold
    { threshold: 50000, rate: 0.09 }, // 9% of income over the threshold for Plan 2 loans
    { threshold: Infinity, rate: 0.09 }, // Continues at 9% for higher income
];

export const calcUsingBands = (income, bands) => {
    let remainingIncome = income;
    let totalAmount = 0;
    let previousThreshold = 0;

    for (const band of bands) {
        const taxableAtThisBand = Math.min(
            Math.max(remainingIncome - previousThreshold, 0),
            band.threshold - previousThreshold
        );
        totalAmount += taxableAtThisBand * band.rate;
        previousThreshold = band.threshold;
    }

    return totalAmount;
};

export const calculateFutureValue = (initialPrincipal, monthlyContribution, annualReturnRate, months) => {
    const monthlyRate = annualReturnRate / 12; // Monthly return rate
    let total = initialPrincipal;

    const monthlyBalances = []; // Array to track the balance month by month

    for (let month = 1; month <= months; month++) {
        // Apply monthly return to the current total
        total *= (1 + monthlyRate);

        // Add the monthly contribution
        total += monthlyContribution;

        // Record the balance for this month
        monthlyBalances.push({ month, value: total });
    }
    return monthlyBalances;
}

export const calcTakeHome = (salary) => {
    // pre tax stuff
    const pension = 1000;

    // tax stuff
    const incomeTax = calcUsingBands(salary, taxBands);
    const ni = calcUsingBands(salary, niBands);
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
