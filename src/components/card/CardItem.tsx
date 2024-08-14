import { CardType } from "@/types/Card"
import TaskItem from "../task/TaskItem"
import CardHeader from "./CardHeader"

const CardItem = ( { card } : { card : CardType } ) => {
  return (
    <li className="list-none w-full  rounded-md bg-[#f1f2f4] dark:bg-[#000022] shadow-lg shadow-blue-900/40 dark:shadow-md dark:shadow-blue-primary/40 py-2 px-1">
        <CardHeader title={card.title} />
        <ol className="gap-2">
            {card.tasks?.map((task, key) => (
                <TaskItem key={key} task={task} />
            ))}
        </ol>
    </li>
  )
}

export default CardItem