import { TaskType } from "@/types/Task"


const TaskItem = ({task} : {task : TaskType}) => {
  return (
    <div className="mb-2 truncate border-2 border-transparent hover:border-blue-primary py-2 px-2 text-sm bg-white dark:bg-[#333366] dark:text-[#CCCCFF] rounded-md shadow-sm">
        {task.title}
    </div>
  )
}

export default TaskItem