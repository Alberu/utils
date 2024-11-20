import { PoundSterling, TrendingUp } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SalaryCard = ({ title, calculations, salary, setSalary }) => (
    <Card>
        <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
                <PoundSterling className="h-5 w-5" />
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

export default SalaryCard