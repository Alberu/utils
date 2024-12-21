import { ItemPrice } from "@/components/ItemPrice";
import PageLayout from "@/components/PageLayout";

const PriceCompare = () => {
  return (
    <PageLayout>
      <div className="space-y-4 w-full max-w-5xl">
        <ItemPrice initialItemName='Pure Aero 98' initialOriginalPrice={{ value: 220, currency: "£" }} />
        <ItemPrice initialItemName='Yonez Ezone 98' initialOriginalPrice={{ value: 192, currency: "£" }} />
      </div>
    </PageLayout>
  );
};

export default PriceCompare;
