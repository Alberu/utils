import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";
import { DisplayButton } from "./DisplayButton";
import { formatCurrency, hanldeDicListAdd } from "@/utils";
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
import DropdownPriceSettings from "./DropdownPriceSettings";

export const ItemPrice = ({
  initialItemName = "Item Name",
  initialOriginalPrice,
}) => {
  // The name of the item
  const [itemName, setItemName] = useState(initialItemName);
  // The different currencies that you can use
  const [currencies, setCurrencies] = useState({ "£": 1, "€": 0.83, $: 1.26 });
  const [activeCurrency, setActiveCurrency] = useState("£");

  // The original price we are compaing this to
  const [originalPrices, setOriginalPrices] = useState([initialOriginalPrice]);

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

  const handlePriceCurrencyChange = (priceIndex, newCurrency, type) => {
    setPrices((oldPrices) =>
      oldPrices.map((price, i) =>
        i === priceIndex ? { ...price, [type]: newCurrency } : price
      )
    );
  };

  const handleOriginalPriceChange = (priceIndex, newCurrency, type) => {
    setOriginalPrices((oldPrices) =>
      oldPrices.map((price, i) =>
        i === priceIndex ? { ...price, [type]: newCurrency } : price
      )
    );
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <DropdownPriceSettings
            text={`${itemName} in ${activeCurrency}`}
            itemValue={itemName}
            handleValueChange={setItemName}
            selectValue={activeCurrency}
            handleSelectValueChange={setActiveCurrency}
            selectOptions={currencies}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <h1 className="font-extralight text-muted-foreground">
          <Button
            variant="outline"
            onClick={() => {
              hanldeDicListAdd(setOriginalPrices, initialOriginalPrice);
            }}
          >
            +
          </Button>{" "}
          Original Price
        </h1>
        {originalPrices.map((price, priceIndex) => {
          const convertedValue =
            (price.value * currencies[price.currency]) /
            currencies[activeCurrency];
          return (
            <DropdownPriceSettings
              key={priceIndex}
              text={`${activeCurrency} ${convertedValue}`}
              itemValue={price.value}
              handleValueChange={handleOriginalPriceChange}
              valueType="value"
              selectValue={price.currency}
              handleSelectValueChange={handleOriginalPriceChange}
              selectType="currency"
              selectOptions={currencies}
              index={priceIndex}
            />
          );
        })}

        <h1 className="font-extralight text-muted-foreground">
          Compare Prices
        </h1>
        {prices.map((price, priceIndex) => {
          const convertedValue =
            (price.value * currencies[price.currency]) /
            currencies[activeCurrency];
          return (
            <DropdownPriceSettings
              key={priceIndex}
              text={`${activeCurrency} ${convertedValue}`}
              itemValue={price.value}
              handleValueChange={handlePriceCurrencyChange}
              valueType="value"
              selectValue={price.currency}
              handleSelectValueChange={handlePriceCurrencyChange}
              selectType="currency"
              selectOptions={currencies}
              index={priceIndex}
            />
          );
        })}
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
            (originalPrices[0].value * currencies[originalPrices[0].currency]) /
              currencies[activeCurrency] -
            appliedPrice;

          const percent_saved =
            (100 * (originalPrices[0].value - appliedPrice)) /
            originalPrices[0].value;
          return (
            <div key={priceIndex}>
              <p className="flex space-x-5 items-baseline">
                <span>{activeCurrency}</span>
                <span>{formatCurrency(originalPrices[0].value)}</span>
                <span>{formatCurrency(appliedPrice)}</span>
                <span className="text-xs text-muted-foreground">
                  (saving {formatCurrency(savings)} or{" "}
                  {percent_saved.toFixed(1)} %)
                </span>
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
