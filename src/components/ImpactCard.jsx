import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { formatCurrency, occuraceMultiplier } from "@/utils";
import { Button } from "./ui/button";
import { TrendingUp } from "lucide-react";
import { DisplayButton } from "./DisplayButton";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export const ImpactCard = ({ expenses }) => {
  // Variable to control the look ahead time period
  const [timePeriod, setTimePeriod] = useState(1);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Future Impact / Ripple Effect / Impact over time
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>Currenlty looking at the effect of {timePeriod} years.</p>
        <Input
          value={timePeriod}
          onChange={(e) => {
            setTimePeriod(e.target.value);
          }}
        />
        {expenses.map((expense, expenseIndex) => {
          const value =
            expense.value * occuraceMultiplier[expense?.type] * timePeriod * 12;
          return (
            <Popover key={expenseIndex}>
              <PopoverTrigger asChild>
                <Button className="flex justify-between w-full" variant="ghost">
                  <div className="flex items-center gap-2">
                    {expense?.category && (
                      <Label
                        className="text-sm text-muted-foreground"
                        style={{ color: expense?.colour }}
                      >
                        {expense?.category}
                      </Label>
                    )}
                    <Label className="text-sm text-muted-foreground">
                      {expense?.name}
                    </Label>
                  </div>
                  <div className="flex items-center gap-4">
                    {/* need to make sure to allow the 0 to show properly */}
                    {(expense?.percent || expense?.percent === 0) && (
                      <span className="bg-slate-200 rounded-sm px-1">
                        {expense?.percent.toFixed(1)} %
                      </span>
                    )}
                    <p className="text-xl font-light">
                      {formatCurrency(value)}
                    </p>
                    {/* make sure that you can switch between these two values in the future */}
                    {/* <p className="text-xl font-bold">£{formatCurrency(value)}</p> */}
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent></PopoverContent>
            </Popover>
          );
        })}
      </CardContent>
    </Card>
  );
};
