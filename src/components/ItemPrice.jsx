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
import { Separator } from "./ui/separator";

export const ItemPrice = ({
  initialItemName = "Item Name",
  initialOriginalPrice,
  initialPrices,
}) => {
  // The name of the item
  const [itemName, setItemName] = useState(initialItemName);
  // The different currencies that you can use
  const [currencies, setCurrencies] = useState({ "£": 1, "€": 0.83, $: 1.26 });
  const [activeCurrency, setActiveCurrency] = useState("£");

  // The original price we are compaing this to
  const [originalPrices, setOriginalPrices] = useState(initialOriginalPrice);

  // To store the differnet prices that you want to compare
  const [prices, setPrices] = useState(initialPrices);

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
              text={`${activeCurrency} ${convertedValue} - ${price.name}`}
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
          <Button
            variant="outline"
            onClick={() => {
              hanldeDicListAdd(setPrices, {
                name: "NewValue",
                value: 209,
                currency: "€",
              });
            }}
          >
            +
          </Button>{" "}
          Compare Prices
        </h1>
        {prices.map((price, priceIndex) => {
          const convertedValue =
            (price.value * currencies[price.currency]) /
            currencies[activeCurrency];
          return (
            <DropdownPriceSettings
              key={priceIndex}
              text={`${activeCurrency} ${convertedValue} - ${price.name}`}
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
        {originalPrices.map((originalPrice, originalPriceIndex) => {
          return (
            <div key={originalPriceIndex}>
              <Separator />
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
                  (100 * (originalPrice.value - appliedPrice)) /
                  originalPrice.value;
                return (
                  <div key={priceIndex}>
                    <p className="flex space-x-5 items-baseline">
                      <span>{activeCurrency}</span>
                      <span>{formatCurrency(originalPrice.value)}</span>
                      <span>{formatCurrency(appliedPrice)}</span>
                      <span className="text-xs text-muted-foreground">
                        (saving {formatCurrency(savings)} or{" "}
                        {percent_saved.toFixed(1)} %)
                      </span>
                      <span className="text-muted-foreground">{originalPrice.name} - {price.name}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
