import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";
import { DisplayButton } from "./DisplayButton";
import { formatCurrency } from "@/utils";

export const ItemPrice = ({initialOriginalPrice}) => {
  // The different currencies that you can use
  const [currencies, setCurrencies] = useState({ "£": 1, "€": 0.83 });

  // The original price we are compaing this to
  const [originalPrice, setOriginalPrice] = useState(initialOriginalPrice);

  // To store the differnet prices that you want to compare
  const [prices, setPrices] = useState([
    { name: "Original", value: 209, applyMultiplier: false, currency: "€" },
    { name: "New", value: 190, applyMultiplier: true, currency: "€" },
  ]);

  // To store the different multipliers that you want to add
  const [multipliers, setMultipliers] = useState([
    { name: "€->£", value: 0.83 },
    { name: "Tax refund", value: 0.8 },
    { name: "Black friday", value: 0.5 },
  ]);

  // To keep track of the active multipliers
  const [activeMultiplliers, setActiveMultipliers] = useState([]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          Item (can add more?)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h1>Original Price</h1>
        {originalPrice.currency}
        {formatCurrency(originalPrice.value)}
        <h1>Prices</h1>
        {prices.map((price, priceIndex) => (
          <DisplayButton
            key={priceIndex}
            name={price.name}
            value={price.value}
          />
        ))}
        <h1>Multipliers</h1>
        <ToggleGroup
          type="multiple"
          onValueChange={(newMults) => setActiveMultipliers(newMults)}
        >
          {multipliers.map((multiplier, multiplierIndex) => (
            <ToggleGroupItem key={multiplierIndex} value={multiplier}>
              {multiplier.name}
              <span>{multiplier.value}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <h1>Savings</h1>
        {prices.map((price, priceIndex) => {
          let appliedPrice = activeMultiplliers.reduce(
            (finalPrice, multiplier) => finalPrice * multiplier.value,
            price.value
          );

          appliedPrice *= currencies[price.currency];
          return (
            <p key={priceIndex}>
              {formatCurrency(appliedPrice)}
              <span className="text-xs text-muted-foreground">
                {" "}
                (saving {formatCurrency(originalPrice.value - appliedPrice)} or{" "}
                {((100 * (originalPrice.value - appliedPrice)) / originalPrice.value).toFixed(
                  1
                )}{" "}
                %)
              </span>
            </p>
          );
        })}
      </CardContent>
    </Card>
  );
};
