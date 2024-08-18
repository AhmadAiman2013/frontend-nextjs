import { CalendarPlus } from "lucide-react";
import PopoverElement from "../PopoverElement";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { format, set } from "date-fns";


const TaskCalendar = () => {
  const [date, setDate] = useState<Date>();
  return (
    <PopoverElement
      triggerElement={
        <Button size="icon" variant="ghost">
          <CalendarPlus size={20} />
        </Button>
      }
      popoverContent={
        <div>
          <Calendar
           captionLayout="dropdown-buttons" fromYear={2010} toYear={2024}
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
          <div className="mx-1">{date ? format(date, "PP") : "Select a date"}</div>
        </div>
      }
      side="right"
    />
  );
};

export default TaskCalendar;
