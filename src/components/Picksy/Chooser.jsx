import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const meta = {
  title: "Arrow Component",
  description: "Upon clicking the arrow, it spins and stops at a random orientation.",
};

export default function Chooser() {
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Finger Chooser</AccordionTrigger>
          <AccordionContent>
            <p>This one needs to be made</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
