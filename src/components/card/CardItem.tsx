import { CardType } from "@/types/Card"
import TaskItem from "../task/TaskItem"
import CardHeaderWrapper from "./CardHeaderWrapper"
import { useCard } from "@/hooks/useCard"
import { useTask } from "@/hooks/useTask"
import TaskCreate from "../task/TaskCreate"

interface CardItemProps {
    card : CardType
}

const CardItem = ( { card } : CardItemProps ) => {
  const { isEditingCard } = useCard({})
  const { isEditingTask } = useTask({})
  return (
    <li className="list-none w-full h-min  rounded-md bg-[#f1f2f4] dark:bg-[#000022] shadow-lg shadow-blue-900/40 dark:shadow-md dark:shadow-blue-primary/40 py-2 px-1">
        <CardHeaderWrapper card={card} editing={isEditingCard({id: card.id})}/>
        <ol className="gap-2">
            {card.tasks?.map((task, key) => (
                <TaskItem key={key} task={task} boardId={card.boards_id} editing={isEditingTask({id: task.id})}/>
            ))}
        </ol>
        <TaskCreate cardId={card.id} boardId={card.boards_id}/>
    </li>
  )
}

export default CardItem