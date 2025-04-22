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
import { useEffect, useState } from "react";
import {
  calcUsingBands,
  niBands,
  studentFinanceBands,
  taxBands,
} from "@/utils/taxCalc";
import { Toggle } from "./ui/toggle";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";

const SalaryCard = ({
  title,
  calculations,
  salary,
  setSalary,
  taxes,
  setTaxes,
  net,
}) => {
  const [effectiveTaxRate, setEffectiveTaxRate] = useState(0);
  const [noPensioneffectiveTaxRate, setNoPensioneffectiveTaxRate] = useState(0);

  const handlePercentChange = (value) => {
    handleUpdateTax(0, Number(value), "percentValue");
    const newValue = (Number(value) / 100) * salary;
    handleUpdateTax(0, newValue, "value");
  };

  // Handle any changes that happen in taxes
  const handleUpdateTax = (taxIndex, newValue, type) => {
    setTaxes((prevTaxes) =>
      prevTaxes.map((tax, i) =>
        i === taxIndex ? { ...tax, [type]: newValue } : tax
      )
    );
  };

  useEffect(() => {
    // Calculate and update each of the different sectoins
    const pension = taxes[0].active ? taxes[0]?.value || 0 : 0;

    for (let i = 1; i < taxes.length; i++) {
      const newValue = calcUsingBands(salary - pension, taxes[i].bands);
      // Only update if the new value is different
      if (newValue !== taxes[i].value) {
        handleUpdateTax(i, newValue, "value");
      }
    }

    // Calcualte the tolta amount of taxes
    const sumOfTaxes = taxes.reduce((sum, tax, index) => {
      // Dont' add the pension into the taxes
      if (index === 0) {
        return sum;
      }

      return tax.active ? sum + tax.value : sum;
    }, 0);
    // Set the new effective percent
    const newEffectiveTaxRate = (sumOfTaxes / salary) * 100;
    if (effectiveTaxRate != newEffectiveTaxRate) {
      setEffectiveTaxRate(newEffectiveTaxRate);
    }

    // Update the pension value
    const newValue = (taxes[0].percentValue / 100) * salary;
    handleUpdateTax(0, newValue, "value");

    // If pension is active, it will tell you how much % of taxes you are able to avoid
    if (taxes[0].active) {
      const noPension = taxes.reduce((sum, tax, index) => {
        // Dont' add the pension into the taxes
        if (index === 0) {
          return sum;
        }

        return tax.active ? sum + calcUsingBands(salary, tax.bands) : sum;
      }, 0);

      if (noPensioneffectiveTaxRate !== (noPension / salary) * 100) {
        setNoPensioneffectiveTaxRate((noPension / salary) * 100);
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
                <p key={taxIndex} className="flex items-center space-x-2">
                  <Switch
                    checked={tax.active}
                    onCheckedChange={(newValue) => {
                      handleUpdateTax(taxIndex, newValue, "active");
                    }}
                  ></Switch>
                  <Popover className="flex items-center">
                    <PopoverTrigger asChild>
                      <Button
                        className="flex justify-between w-full"
                        variant="ghost"
                      >
                        <Label className="text-sm text-muted-foreground">
                          {tax?.name}
                        </Label>
                        <p className="text-xl font-extralight">
                          {tax.active
                            ? formatCurrency(tax?.value)
                            : formatCurrency(0)}
                        </p>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="space-y-2">
                      {(tax?.percentValue || tax?.percentValue == 0) && (
                        <div className="space-y-2">
                          <Label className="text-sm font-light text-muted-foreground">
                            Percent Selected{" "}
                            <span className="text-black">
                              {tax?.percentValue} %
                            </span>
                          </Label>
                          <Slider
                            value={[tax?.percentValue]}
                            min={0}
                            max={20}
                            step={1}
                            onValueChange={(value) => {
                              handlePercentChange(value[0]);
                            }}
                          />
                        </div>
                      )}
                      <p className="flex items-center justify-between">
                        <span className="font-light">Active</span>
                        <Switch
                          checked={tax.active}
                          onCheckedChange={(newValue) => {
                            handleUpdateTax(taxIndex, newValue, "active");
                          }}
                        ></Switch>
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
                <p className="text-xl font-bold">£{formatCurrency(net)}</p>
              </Button>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">
                Effective Tax Rate
              </Label>
              <p className="text-lg">
                {effectiveTaxRate.toFixed(1)} %{" "}
                {taxes[0].active && (
                  <>
                    <span className="text-xs text-muted-foreground">
                      (saving £
                      {formatCurrency(
                        (noPensioneffectiveTaxRate * salary) / 100 -
                          (effectiveTaxRate * salary) / 100
                      )}{" "}
                      or{" "}
                      {(noPensioneffectiveTaxRate - effectiveTaxRate).toFixed(
                        1
                      )}{" "}
                      % from {noPensioneffectiveTaxRate.toFixed(1)} %)
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>
          <CircularPieChart
            chartData={[
              ...taxes.filter((tax) => tax.active),
              {
                name: "Take Home Pay",
                value: net,
                colour: "#2ECE2E",
              },
            ]}
          />
        </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Stats</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col">
                  <Label className="text-sm text-muted-foreground">
                    Effective Tax Rate
                  <span className="text-lg">
                    {effectiveTaxRate.toFixed(1)} %{" "}
                    {taxes[0].active && (
                      <>
                        <span className="text-xs text-muted-foreground">
                          (saving £
                          {formatCurrency(
                            (noPensioneffectiveTaxRate * salary) / 100 -
                              (effectiveTaxRate * salary) / 100
                          )}{" "}
                          or{" "}
                          {(noPensioneffectiveTaxRate - effectiveTaxRate).toFixed(
                            1
                          )}{" "}
                          % from {noPensioneffectiveTaxRate.toFixed(1)} %)
                        </span>
                      </>
                    )}
                  </span>
                  </Label>
                  <Label className="text-sm text-muted-foreground">Hourly rate{(salary/52/40).toFixed(2)}</Label>
                  <Label className="text-sm text-muted-foreground">Net hourly rate{(net/52/40).toFixed(2)}</Label>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
      </CardContent>
    </Card>
  );
};

export default SalaryCard;
