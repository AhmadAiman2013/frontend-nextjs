import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";


interface PopoverElementProps {
    triggerElement: React.ReactNode;
    popoverContent: React.ReactNode;
    side?: "top" | "right" | "bottom" | "left";
}

const PopoverElement = ({ triggerElement, popoverContent, side }: PopoverElementProps) => {
    return (
        <Popover>
          <PopoverTrigger asChild >{triggerElement}</PopoverTrigger>
          <PopoverContent className="w-15 p-1" side={side}>
            {popoverContent}
          </PopoverContent>
        </Popover>
      );
}

export default PopoverElement