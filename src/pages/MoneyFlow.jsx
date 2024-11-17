import { useState } from "react";

const MoneyFlow = () => {
    const [salary1, setSalary1] = useState(30000);
    const [salary2, setSalary2] = useState(70000);

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
        const incomeTax = calculateIncomeTax(salary);
        const ni = calculateNI(salary);
        return {
            gross: salary,
            incomeTax,
            ni,
            net: salary - incomeTax - ni,
        };
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold">Money Flow</h1>
        </div>
    );
};

export default MoneyFlow;
