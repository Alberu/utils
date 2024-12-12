import { HandCoins, PoundSterling, TrendingUp } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CircularPieChart from "./CircularPieChart";
import { formatCurrency } from "@/utils";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useEffect } from "react";
import {
  calcUsingBands,
  niBands,
  studentFinanceBands,
  taxBands,
} from "@/utils/taxCalc";
import { Toggle } from "./ui/toggle";
import { Switch } from "./ui/switch";

const SalaryCard = ({
  title,
  calculations,
  salary,
  setSalary,
  taxes,
  setTaxes,
  net,
}) => {
  // Handle any changes that happen in taxes
  const handleUpdateTax = (taxIndex, newValue, type) => {
    setTaxes((prevTaxes) =>
      prevTaxes.map((tax, i) =>
        i === taxIndex ? { ...tax, [type]: newValue } : tax
      )
    );
  };

  useEffect(() => {
    // Calcaulte and update each of the different sectoins
    const pension = taxes[0].active ? taxes[0]?.value || 0 : 0;

    for (let i = 1; i < taxes.length; i++) {
      const newValue = calcUsingBands(salary - pension, taxes[i].bands);
      // Only update if the new value is different
      if (newValue !== taxes[i].value) {
        handleUpdateTax(i, newValue, "value");
      }
    }
  }, [salary, taxes]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <HandCoins className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="items-start grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="my-0 py-0 flex justify-between w-full group-hover:opacity-0 transition-opacity duration-100"
                    variant="ghost"
                  >
                    <Label className="text-sm text-muted-foreground">
                      Gross Salary
                    </Label>
                    <p className="text-xl font-bold">
                      £{formatCurrency(salary)}
                    </p>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex">
                  <Label className="text-sm text-muted-foreground">
                    Gross Salary
                  </Label>
                  <Input
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(Number(e.target.value))}
                    className="text-right w-full h-full px-4 py-2"
                    step="1000"
                    min="0"
                  />
                </PopoverContent>
              </Popover>

              <Separator />

              {taxes.map((tax, taxIndex) => (
                <p className="flex items-center space-x-2">
                      <Switch checked={tax.active} onCheckedChange={(newValue) => {handleUpdateTax(taxIndex, newValue, 'active')}}></Switch>
                <Popover key={taxIndex} className="flex items-center">
                  <PopoverTrigger asChild>
                    <Button
                      className="flex justify-between w-full"
                      variant="ghost"
                    >
                      <Label className="text-sm text-muted-foreground">
                        {tax?.name}
                      </Label>
                      <p className="text-xl font-extralight">
                        {tax.active ? formatCurrency(tax?.value) : formatCurrency(0)}
                      </p>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="space-y-2">
                    <p className="flex items-center justify-between">
                      <span className="font-light">Active</span>
                      <Switch checked={tax.active} onCheckedChange={(newValue) => {handleUpdateTax(taxIndex, newValue, 'active')}}></Switch>
                    </p>
                    {tax?.bands && (
                      <>
                        <Button variant="outline" className="w-full">
                          Change bands
                        </Button>
                        {tax.bands.map((band, bandIndex) => (
                          <p
                            key={bandIndex}
                            className="flex justify-between font-light"
                          >
                            <span>{formatCurrency(band.threshold)}</span>
                            <span>{`${(band.rate * 100).toFixed(0)}%`}</span>
                          </p>
                        ))}
                      </>
                    )}
                  </PopoverContent>
                </Popover>
                </p>
              ))}
              <Separator />

              <Button className="flex justify-between w-full" variant="ghost">
                <Label className="text-sm text-muted-foreground">
                  Take Home Pay
                </Label>
                <p className="text-xl font-bold">
                  £{formatCurrency(net)}
                </p>
              </Button>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">
                Effective Tax Rate
              </Label>
              <p className="text-lg">
                {(
                  ((calculations?.incomeTax + calculations?.ni) / salary) *
                  100
                ).toFixed(1)}{" "}
                %
              </p>
            </div>
          </div>
          <CircularPieChart
            chartData={[
              {
                name: "Income Tax",
                value: calculations.incomeTax,
                colour: "#f00",
              },
              {
                name: "National Insurance",
                value: calculations.ni,
                colour: "#FA961F",
              },
              {
                name: "Take Home Pay",
                value: calculations.net,
                colour: "#ABAA99",
              },
            ]}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SalaryCard;
