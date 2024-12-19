import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";
import { DisplayButton } from "./DisplayButton";
import { formatCurrency } from "@/utils";

export const ItemPrice = () => {
  // To store the differnet prices that you want to compare
  const [prices, setPrices] = useState([
    { name: "Original", value: 209, applyMultiplier: false },
    { name: "New", value: 190, applyMultiplier: true },
  ]);

  // To store the different multipliers that you want to add
  const [multipliers, setMultipliers] = useState([
    { name: "€->£", value: 0.83, isActive: true },
    { name: "Tax refund", value: 0.8, isActive: true },
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          Item (can add more?)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h1>Prices</h1>
        {prices.map((price, priceIndex) => (
          <DisplayButton
            key={priceIndex}
            name={price.name}
            value={price.value}
          />
        ))}
        <h1>Multipliers</h1>
        <ToggleGroup type="multiple" value={multipliers} onValueChange={(newValue) => {console.log(newValue)}}>
          {multipliers.map((multiplier, multiplierIndex) => (
            <ToggleGroupItem key={multiplierIndex} value={multiplier.value}>
              {multiplier.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <h1>Savings</h1>
        {prices.map((price, priceIndex) => (
          <p key={priceIndex}>
            {formatCurrency(
              multipliers.reduce(
                (finalPrice, multiplier) => finalPrice * multiplier.value,
                price.value
              )
            )}
          </p>
        ))}
      </CardContent>
    </Card>
  );
};
