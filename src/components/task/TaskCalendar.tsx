import { CalendarPlus } from "lucide-react";
import PopoverElement from "../PopoverElement";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat'


const TaskCalendar = () => {
  const [date, setDate] = useState<Date>();
  dayjs.extend(localizedFormat)

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
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </div>
      }
      side="right"
    />
  );
};

export default TaskCalendar;
