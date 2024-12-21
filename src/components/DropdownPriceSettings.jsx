import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";

const DropdownPriceSettings = ({
  text,
  itemValue,
  handleValueChange,
  selectValue,
  handleSelectValueChange,
  selectOptions,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <h2>
          {text}
        </h2>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>
          <Input
            value={itemValue}
            onChange={(e) => {
              handleValueChange(e.target.value);
            }}
          />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectValue}
          onValueChange={(value) => {
            handleSelectValueChange(value);
          }}
        >
          {Object.keys(selectOptions).map((option, optionIndex) => (
            <DropdownMenuRadioItem key={optionIndex} value={option}>
              {option}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownPriceSettings;
