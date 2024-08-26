import { CalendarPlus } from "lucide-react";
import PopoverElement from "../PopoverElement";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { useTask } from "@/hooks/useTask";

const TaskCalendar = () => {
  const [date, setDate] = useState<Date>();
  const { updateTask, isPendingUpdate } = useTask({});
  
  return (
    <PopoverElement
      triggerElement={
        <Button size="icon" variant="ghost" disabled={isPendingUpdate}>
          <CalendarPlus size={20} />
        </Button>
      }
      popoverContent={
        <div>
          <div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </div>
          <div className="mt-1">
            <Button className="w-full bg-gradient-to-r  from-blue-200 to-fuchsia-200 hover:from-blue-400 hover:to-fuchsia-400  text-blue-800 hover:text-blue-900 dark:text-white/90 dark:bg-gradient-to-r dark:from-blue-500/40 dark:to-fuchsia-500/40 dark:hover:text-white dark:hover:from-blue-500 dark:hover:to-fuchsia-500">Set Date</Button>
          </div>
        </div>
      }
      side="right"
    />
  );
};

export default TaskCalendar;
