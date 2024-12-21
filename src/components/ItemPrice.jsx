import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";
import { DisplayButton } from "./DisplayButton";
import { formatCurrency } from "@/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Input } from "./ui/input";

export const ItemPrice = ({ initialOriginalPrice }) => {
  // The different currencies that you can use
  const [currencies, setCurrencies] = useState({ "£": 1, "€": 0.83, $: 1.26 });
  const [activeCurrency, setActiveCurrency] = useState("£");

  // The original price we are compaing this to
  const [originalPrice, setOriginalPrice] = useState(initialOriginalPrice);

  // To store the differnet prices that you want to compare
  const [prices, setPrices] = useState([
    { name: "Original", value: 209, applyMultiplier: false, currency: "€" },
    { name: "New", value: 190, applyMultiplier: true, currency: "€" },
  ]);

  // To store the different multipliers that you want to add
  const [multipliers, setMultipliers] = useState([
    { name: "Tax refund", value: 0.8 },
    { name: "Less Tax refund", value: 0.85 },
    { name: "Black friday", value: 0.5 },
  ]);

  // To keep track of the active multipliers
  const [activeMultiplliers, setActiveMultipliers] = useState([]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <h2>Item</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{activeCurrency}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Main Currency</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={activeCurrency}
                onValueChange={(value) => {
                  setActiveCurrency(value);
                }}
              >
                {Object.keys(currencies).map((currency, currencyIndex) => (
                  <DropdownMenuRadioItem key={currencyIndex} value={currency}>
                    {currency}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <h1 className="font-extralight text-muted-foreground">
          Original Price
        </h1>
        <Popover>
          <PopoverTrigger asChild>
            <p>
              <span>
                {activeCurrency}{" "}
                {formatCurrency(
                  (originalPrice.value * currencies[originalPrice.currency]) /
                    currencies[activeCurrency]
                )}
              </span>
              <span className="text-xs text-muted-foreground">
                {" "}
                ({originalPrice.currency} {formatCurrency(originalPrice.value)})
              </span>
            </p>
          </PopoverTrigger>
          <PopoverContent align="start">
            <Input
              value={originalPrice.value}
              onChange={(e) => {
                setOriginalPrice((OldPrice) => ({
                  ...OldPrice,
                  ["value"]: e.target.value,
                }));
              }}
            />
            <span>currency change will be here</span>
          </PopoverContent>
        </Popover>
        <h1 className="font-extralight text-muted-foreground">
          Compare Prices
        </h1>
        {prices.map((price, priceIndex) => (
          <p key={priceIndex}>
            <span>
              {activeCurrency}{" "}
              {formatCurrency(
                (price.value * currencies[price.currency]) /
                  currencies[activeCurrency]
              )}
            </span>
            <span className="text-xs text-muted-foreground">
              {" "}
              ({price.name} {price.currency} {formatCurrency(price.value)})
            </span>
          </p>
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
        <h1>Savings / Output</h1>
        {prices.map((price, priceIndex) => {
          let appliedPrice = activeMultiplliers.reduce(
            (finalPrice, multiplier) => finalPrice * multiplier.value,
            price.value
          );

          appliedPrice *=
            currencies[price.currency] / currencies[activeCurrency];

          // Calculate the amount of savings
          const savings =
            (originalPrice.value * currencies[originalPrice.currency]) /
              currencies[activeCurrency] -
            appliedPrice;

          const percent_saved =
            (100 * (originalPrice.value - appliedPrice)) / originalPrice.value;
          return (
            <div key={priceIndex}>
              <p className="flex space-x-5 items-baseline">
                <span>{activeCurrency}</span>
                <span>{formatCurrency(originalPrice.value)}</span>
                <span>{formatCurrency(appliedPrice)}</span>
                <span className="text-xs text-muted-foreground">(saving {formatCurrency(savings)} or {percent_saved.toFixed(1)} %)</span>
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
