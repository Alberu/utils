import { ItemPrice } from "@/components/ItemPrice";
import PageLayout from "@/components/PageLayout";

const PriceCompare = () => {
  return (
    <PageLayout>
      <div className="space-y-4 w-full max-w-5xl">
        <ItemPrice initialOriginalPrice={{ value: 209, currency: "£" }} />
        <ItemPrice initialOriginalPrice={{ value: 140, currency: "£" }} />
      </div>
    </PageLayout>
  );
};

export default PriceCompare;
