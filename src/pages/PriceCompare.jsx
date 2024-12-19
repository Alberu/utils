import { ItemPrice } from "@/components/ItemPrice";
import PageLayout from "@/components/PageLayout";

const PriceCompare = () => {
  return (
    <PageLayout>
      <div className="space-y-4 w-full max-w-5xl">
        <ItemPrice />
        <ItemPrice />
      </div>
    </PageLayout>
  );
};

export default PriceCompare;
