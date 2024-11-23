import { PoundSterling, TrendingUp } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CircularPieChart from "./CircularPieChart";
import { formatCurrency } from "@/utils";
import { Button } from "./ui/button";

const SalaryCard = ({ title, calculations, salary, setSalary }) => (
    <Card>
        <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                {title}
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="items-start grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    {/* <Input
                        id={title}
                        type="number"
                        value={salary}
                        onChange={(e) => setSalary(Number(e.target.value))}
                        className="w-full"
                    />
                    <div>
                        <Label className="text-sm text-muted-foreground">Take Home Pay</Label>
                        <p className="text-2xl font-bold">
                            £{formatCurrency(calculations?.net)}
                        </p>
                    </div>
                    <Separator /> */}
                    <div>
                        <div className="group relative">
                            <Button className='my-0 py-0 flex justify-between w-full group-hover:opacity-0 transition-opacity duration-100' variant='ghost'>
                                <Label className="text-sm text-muted-foreground">Gross Salary</Label>
                                <p className="text-2xl font-bold">
                                    £{formatCurrency(salary)}
                                </p>
                            </Button>
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 flex items-center">
                                <Label className="text-sm text-muted-foreground">Gross Salary</Label>
                                <Input
                                    type="number"
                                    value={salary}
                                    onChange={(e) => setSalary(Number(e.target.value))}
                                    className="text-right w-full h-full px-4 py-2"
                                    step="0.01"
                                    min="0"
                                />
                            </div>
                        </div>

                        <Separator />

                        <Button className='my-0 py-0 flex justify-between w-full' variant='ghost'>
                            <Label className="text-sm text-muted-foreground">Income Tax</Label>
                            <p className="text-2xl font-extralight">
                                {formatCurrency(calculations?.incomeTax)}
                            </p>
                        </Button>
                        <Button className='flex justify-between w-full' variant='ghost'>
                            <Label className="text-sm text-muted-foreground">National Insurance</Label>
                            <p className="text-2xl font-extralight">
                                {formatCurrency(calculations?.ni)}
                            </p>
                        </Button>
                        <Button className='flex justify-between w-full' variant='ghost'>
                            <Label className="text-sm text-muted-foreground">Pension</Label>
                            <p className="text-2xl font-extralight">
                                {formatCurrency(0)}
                            </p>
                        </Button>
                        <Button className='flex justify-between w-full' variant='ghost'>
                            <Label className="text-sm text-muted-foreground">Student Finance</Label>
                            <p className="text-2xl font-extralight">
                                {formatCurrency(0)}
                            </p>
                        </Button>

                        <Separator />

                        <Button className='flex justify-between w-full' variant='ghost'>
                            <Label className="text-sm text-muted-foreground">Take Home Pay</Label>
                            <p className="text-2xl font-bold">
                                £{formatCurrency(calculations?.net)}
                            </p>
                        </Button>
                        {/* <div>
                            <Label className="text-sm text-muted-foreground">Income Tax</Label>
                            <p className="text-lg">
                                £{formatCurrency(calculations?.incomeTax)}
                            </p>
                        </div>
                        <div>
                            <Label className="text-sm text-muted-foreground">
                                National Insurance
                            </Label>
                            <p className="text-lg">£{formatCurrency(calculations?.ni)}</p>
                        </div> */}
                        {/* <div>
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
                        </div> */}
                    </div>
                </div>
                <CircularPieChart chartData={[
                    { name: "Income Tax", value: calculations.incomeTax, colour: '#f00' },
                    { name: "National Insurance", value: calculations.ni, colour: '#FA961F' },
                    { name: "Take Home Pay", value: calculations.net, colour: '#ABAA99' },
                ]} />
            </div>
        </CardContent>
    </Card>
);

export default SalaryCard