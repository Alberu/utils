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
  valueType = null,
  selectValue,
  handleSelectValueChange,
  selectOptions,
  selectType = null,
  index=null,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <h2>{text}</h2>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>
          <Input
            value={itemValue}
            onChange={(e) => {
              if (valueType === null) {
                handleValueChange(e.target.value);
              } else {
                handleValueChange(
                  index,
                  e.target.value,
                  valueType
                );
              }
            }}
          />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectValue}
          onValueChange={(value) => {
            if (selectType === null) {
              handleSelectValueChange(value);
            } else {
              handleValueChange(
                index,
                value,
                selectType
              );
            }
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
