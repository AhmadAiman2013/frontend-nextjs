import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";

const PopoverElement = ({ triggerElement, popoverContent }: { triggerElement: React.ReactNode,popoverContent: React.ReactNode }) => {
    return (
        <Popover>
          <PopoverTrigger asChild >{triggerElement}</PopoverTrigger>
          <PopoverContent className="w-15 p-1">
            {popoverContent}
          </PopoverContent>
        </Popover>
      );
}

export default PopoverElement