import { ItemPrice } from "@/components/ItemPrice";
import PageLayout from "@/components/PageLayout";

const PriceCompare = () => {
  return (
    <PageLayout>
      <div className="space-y-4 w-full max-w-5xl">
        <ItemPrice
          initialItemName="Pure Aero 98"
          initialOriginalPrice={[
            { name: 'Tennis-point uk', value: 250, currency: "£" },
            { name: 'All things tennis uk', value: 215, currency: "£" },
            { name: 'All things tennis uk (25 voucher)', value: 215-25, currency: "£" },
          ]}
          initialPrices={[
            { name: "Tennis-point es", value: 240, currency: "€" },
          ]}
        />
        <ItemPrice
          initialItemName="Yonez Ezone 98"
          initialOriginalPrice={[
            { name: 'Tennis-point uk', value: 220, currency: "£" },
            { name: 'All things tennis uk', value: 200, currency: "£" },
            { name: 'All things tennis uk (25 voucher)', value: 200-25, currency: "£" },
          ]}
          initialPrices={[
            { name: "Tennis-point es", value: 220, currency: "€" },
          ]}
        />
      </div>
    </PageLayout>
  );
};

export default PriceCompare;
