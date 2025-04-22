// Picksy, EenieMeenie
import { Separator } from "@/components/ui/separator";
import PageLayout from "@/components/PageLayout";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const meta = {
  title: "Picksy",
  description: "Having trouble deciding? Use me!",
};

const Picksy = () => {
  const modules = import.meta.glob("@/components/Picksy/*.jsx", {
    eager: true,
  });

  const components = Object.values(modules).map((mod) => ({
    Component: mod.default,
    meta: mod.meta || { title: "Untitled", description: "" },
  }));

  return (
    <>
      <PageLayout>
        <div className="w-full">
          <Separator />
          <Accordion type="multiple" collapsible>
            {components.map(({ Component, meta }, i) => {
              return (
                <AccordionItem value={`item-${i}`}>
                  <AccordionTrigger>{meta.title}</AccordionTrigger>
                  <AccordionContent>
                    <Component />
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </PageLayout>
    </>
  );
};

export default Picksy;
