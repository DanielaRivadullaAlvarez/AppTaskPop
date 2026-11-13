"use client";

import { startTransition, useOptimistic } from "react";

import { FiCheck } from "react-icons/fi";
import { Todo } from "@prisma/client";

interface Props {
  todo: Todo;
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({
      ...state,
      complete: newCompleteValue,
    }),
  );

  const onToggleTodo = () => {
    const newCompleteValue = !todoOptimistic.complete;

    startTransition(async () => {
      toggleTodoOptimistic(newCompleteValue);

      try {
        await toggleTodo(todoOptimistic.id, newCompleteValue);
      } catch (error) {
        console.error("Error al actualizar la tarea:", error);
        alert("No se pudo actualizar la tarea.");
      }
    });
  };

  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm border border-[#f5f1ff] transition-all hover:border-[#eeeaf6] hover:shadow-md">
      <div
        onClick={onToggleTodo}
        className={`flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors ${
          todoOptimistic.complete
            ? "bg-[#c8f36d] text-[#33421c]"
            : "border-2 border-[#ded8eb] hover:bg-[#eee8ff]"
        }`}
      >
        {todoOptimistic.complete && <FiCheck size={14} strokeWidth={3} />}
      </div>

      <p
        className={`text-sm font-bold truncate ${
          todoOptimistic.complete
            ? "text-[#aaa2bd] line-through"
            : "text-[#242038]"
        }`}
      >
        {todoOptimistic.description}
      </p>
    </div>
  );
};
