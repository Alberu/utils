import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Roulette() {
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Roulette</AccordionTrigger>
          <AccordionContent>
            <p>This one needs to be made</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}