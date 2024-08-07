'use client'

import { useBoard } from "@/hooks/useBoard"
import { useParams } from "next/navigation"

const BoardsPage = () => {
    const { id } = useParams()
    const { board } = useBoard({ id : id as string })
  return (
    <div className="pt-12 mb-8 w-full max-w-[990px]">
        {board?.data?.title}
        {board?.data?.cards?.map((card, key) => {
            return <div className="m-3" key={key}>{card.title}
            {card.tasks?.map((task, key) => {
                return <ul key={key}>
                    <li>{task.title}</li>
                    <li>Completed: {task.completed}</li>
                </ul>
            })}</div>
        })}
        <div>create some task!</div>
    </div>
  )
}

export default BoardsPage