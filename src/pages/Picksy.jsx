// Picksy, EenieMeenie
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PageLayout from "@/components/PageLayout";
import { Fuel } from "lucide-react";
import { formatCurrency } from "@/utils";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Picksy = () => {
  const modules = import.meta.glob("@/components/Picksy/*.jsx", {
    eager: true,
  });

  //   const components = Object.values(modules).map((mod) => mod.default);
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
