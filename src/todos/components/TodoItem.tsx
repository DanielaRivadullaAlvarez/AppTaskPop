"use client";

import { FiCheck } from "react-icons/fi";
import { Todo } from "@prisma/client";

interface Props {
  todo: Todo;
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm border border-[#f5f1ff] transition-all hover:border-[#eeeaf6] hover:shadow-md">
      <div
        onClick={() => toggleTodo(todo.id, !todo.complete)}
        className={`flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors ${
          todo.complete
            ? "bg-[#c8f36d] text-[#33421c]"
            : "border-2 border-[#ded8eb] hover:bg-[#eee8ff]"
        }`}
      >
        {todo.complete && <FiCheck size={14} strokeWidth={3} />}
      </div>

      <p
        className={`text-sm font-bold truncate ${
          todo.complete ? "text-[#aaa2bd] line-through" : "text-[#242038]"
        }`}
      >
        {todo.description}
      </p>
    </div>
  );
};
