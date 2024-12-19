import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const PriceCompare = () => {
  return (
    <PageLayout>
      <div className="space-y-4 w-full max-w-5xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              Item (can add more?)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h1>Prices</h1>
            <h1>Multipliers</h1>
            <ToggleGroup type='multiple'>
                <ToggleGroupItem value='hi' >Hi</ToggleGroupItem>
            </ToggleGroup>
            <h1>Savings</h1>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default PriceCompare;
