import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import FormInput from "../FormInput"

const BoardsPopover = ({ children } : {children : React.ReactNode}) => {
  return (
    <Popover >
        <PopoverTrigger asChild>
          {children}
        </PopoverTrigger>
        <PopoverContent className="w-30 p-1">
          <FormInput />
        </PopoverContent>
      </Popover>
  )
}

export default BoardsPopover