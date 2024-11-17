import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { PoundSterling, TrendingUp } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

const SalaryCard = ({ title, calculations, salary, setSalary }) => (
    <Card>
        <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
                <PoundSterling className="h-4 w-4" />
                {title}
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <Input
                    id={title}
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(Number(e.target.value))}
                    className="w-full"
                />
                <div>
                    <Label className="text-sm text-muted-foreground">Take Home Pay</Label>
                    <p className="text-2xl font-bold">
                        £{calculations?.net.toLocaleString()}
                    </p>
                </div>
                <Separator />
                <div className="space-y-2">
                    <div>
                        <Label className="text-sm text-muted-foreground">Income Tax</Label>
                        <p className="text-lg">
                            £{calculations?.incomeTax.toLocaleString()}
                        </p>
                    </div>
                    <div>
                        <Label className="text-sm text-muted-foreground">
                            National Insurance
                        </Label>
                        <p className="text-lg">£{calculations?.ni.toLocaleString()}</p>
                    </div>
                    <div>
                        <Label className="text-sm text-muted-foreground">
                            Effective Tax Rate
                        </Label>
                        <p className="text-lg">
                            {(
                                ((calculations?.incomeTax + calculations?.ni) / salary) *
                                100
                            ).toFixed(1)}
                            %
                        </p>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
);

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
        const incomeTax = calcIncomeTax(salary);
        const ni = calcNI(salary);
        return {
            gross: salary,
            incomeTax,
            ni,
            net: salary - incomeTax - ni,
        };
    };

    const salary1Calcs = calcTakeHome(salary1);
    const salary2Calcs = calcTakeHome(salary2);

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold">Money Flow</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SalaryCard
                    title="Salary 1"
                    calculations={salary1Calcs}
                    salary={salary1}
                    setSalary={setSalary1}
                />
                <SalaryCard
                    title="Salary 2"
                    calculations={salary2Calcs}
                    salary={salary2}
                    setSalary={setSalary2}
                />
            </div>
        </>
    );
};

export default MoneyFlow;
