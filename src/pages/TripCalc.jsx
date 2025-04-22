import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PageLayout from "@/components/PageLayout";
import { Fuel } from "lucide-react";
import { formatCurrency } from "@/utils";

export const meta = {
  title: "Trip Price Calculator",
  description: "To calculate price of fuel by car.",
};

const TripCalc = () => {
    const [fuelEconomy, setFuelEconomy] = useState(40);
    const [fuelPrice, setFuelPrice] = useState(1.4);
    const [distance, setDistance] = useState(50);

    const [distanceUnit, setDistanceUnit] = useState("miles");
    const distanceUnits = { km: distance * 0.621371, miles: distance };

    const [fuelEconomyUnit, setFuelEconomyUnit] = useState('MPG')
    const fuelEconomyUnits = { MPG: fuelEconomy / 3.785, 'L/100 km': 62.1371 / fuelEconomy }

    const [currency, setCurrency] = useState('£')
    const currencies = ['£', '$', '€']

    const tripPrice = (distanceUnits[distanceUnit] / (fuelEconomyUnits[fuelEconomyUnit])) * fuelPrice;

    return (
        <>
            <PageLayout>
                {/* <div className="container mx-auto px-4 py-8 max-w-lg"> */}
                <Card className='container max-w-lg'>
                    <CardHeader>
                        <CardTitle className='text-lg flex items-center gap-2'><Fuel className="h-5 w-5" />Calculate the price of your trip</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div>
                                <Label className="text-muted-foreground">Distance</Label>
                                <div className="flex items-center space-x-1">
                                    <Input
                                        id="mpg"
                                        type="number"
                                        value={distance}
                                        onChange={(e) => setDistance(Number(e.target.value))}
                                    />
                                    {Object.entries(distanceUnits).map((unit, unitId) => {
                                        return <Button
                                            className={unit[0] == distanceUnit ? 'border-gray-600' : ''}
                                            key={unitId}
                                            variant='outline'
                                            onClick={() => {
                                                setDistanceUnit(unit[0])
                                            }}>
                                            {unit[0]}
                                        </Button>;
                                    })}
                                </div>
                            </div>

                            <div>
                                <Label className="text-muted-foreground">Fuel Economy</Label>
                                <div className="flex items-center space-x-1">
                                    <Input
                                        id="fuel economy"
                                        type="number"
                                        value={fuelEconomy}
                                        onChange={(e) => setFuelEconomy(Number(e.target.value))}
                                    />
                                    {Object.entries(fuelEconomyUnits).map((unit, unitId) => {
                                        return <Button
                                            className={unit[0] == fuelEconomyUnit ? 'border-gray-600' : ''}
                                            key={unitId}
                                            variant='outline'
                                            onClick={() => {
                                                setFuelEconomyUnit(unit[0])
                                            }}>
                                            {unit[0]}
                                        </Button>;
                                    })}
                                </div>
                            </div>

                            <div>
                                <Label className="text-muted-foreground">Fuel Price</Label>
                                <div className="flex items-center space-x-1">
                                    <Input
                                        id="petrol price"
                                        type="number"
                                        value={fuelPrice}
                                        onChange={(e) => setFuelPrice(Number(e.target.value))}
                                    />
                                    {currencies.map((unit, unitId) => {
                                        return <Button
                                            className={unit == currency ? 'border-gray-600' : ''}
                                            key={unitId}
                                            variant='outline'
                                            onClick={() => {
                                                setCurrency(unit)
                                            }}>
                                            {unit}
                                        </Button>;
                                    })}
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <Label className="text-sm text-muted-foreground">
                                Price of the trip
                            </Label>
                            <p className="text-2xl font-bold">
                                {currency}{formatCurrency(tripPrice)}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </PageLayout>
        </>
    );
};

export default TripCalc;
