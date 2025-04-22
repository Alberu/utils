import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Coin() {
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Coin</AccordionTrigger>
          <AccordionContent>
            <p>This one needs to be made</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}