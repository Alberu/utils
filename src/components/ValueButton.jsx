import { formatCurrency } from "@/utils";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function ValueButton({
  children,
  name,
  colour,
  value,
  variant = "default",
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex justify-between w-full" variant="ghost">
          <div className="flex items-center gap-2">
            <Label className="text-sm text-muted-foreground">new_{name}</Label>
            {variant == "default" && (
              <span
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: colour }}
              ></span>
            )}
          </div>
          {variant == "default" && (
            <p className="text-xl font-light">{formatCurrency(value)}</p>
          )}
          {variant == "bold" && (
            <p className="text-xl font-bold">£{formatCurrency(value)}</p>
          )}
          {/* make sure that you can switch between these two values in the future */}
          {/* <p className="text-xl font-bold">£{formatCurrency(value)}</p> */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex">{children}</PopoverContent>
    </Popover>
  );
}
