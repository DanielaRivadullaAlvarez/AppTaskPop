"use client";

import { Todo } from "@prisma/client";
import { TodoItem } from "../../todos/components/TodoItem";

import * as todosApi from "../helpers/todos"; // Ajusta esta ruta a donde guardaste todos.ts
import { useRouter } from "next/navigation";
import { FiTrash } from "react-icons/fi";

interface Props {
  todos?: Todo[];
}

export const TodoList = ({ todos = [] }: Props) => {
  const router = useRouter();

  // Filtramos las tareas para separarlas en dos grupos
  const pendientes = todos.filter((todo) => !todo.complete);
  const completadas = todos.filter((todo) => todo.complete);

  const toggleTodo = async (id: string, complete: boolean) => {
    await todosApi.updateTodo(id, complete);
    router.refresh();
  };
  const deleteCompleted = async () => {
    await todosApi.deleteCompletedTodos();
    router.refresh();
  };

  return (
    <section className="w-full">
      {/* Encabezado Principal con el botón de eliminar y contador general */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-extrabold tracking-tight text-[#242038]">
            Mis tareas
          </h2>
          <span className="rounded-full bg-linear-to-r from-purple-600 to-purple-400 px-4 py-1.5 text-xs font-bold text-white shadow-sm">
            {todos.length} tareas
          </span>
        </div>

        {/* Solo mostramos el botón de eliminar si hay tareas completadas */}
        {completadas.length > 0 && (
          <button
            onClick={deleteCompleted}
            type="button"
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#ffe5e9] px-4 py-2 text-xs font-extrabold text-[#c96c7f] transition hover:bg-[#ffcdd6]"
          >
            <FiTrash size={14} />
            Borrar completadas ({completadas.length})
          </button>
        )}
      </div>

      {/* TAREAS PENDIENTES */}
      <div className="mb-8">
        <h3 className="mb-4 text-sm font-bold text-[#8058d3]">Pendientes ✨</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pendientes.map((todo) => (
            <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
          ))}
        </div>
        {pendientes.length === 0 && todos.length > 0 && (
          <p className="text-sm text-[#aaa2bd] italic">
            ¡Genial! No hay tareas pendientes.
          </p>
        )}
      </div>

      {/* TAREAS COMPLETADAS */}
      {completadas.length > 0 && (
        <div>
          <h3 className="mb-4 text-sm font-bold text-[#aaa2bd]">
            Completadas ✅
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 opacity-70">
            {completadas.map((todo) => (
              <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
            ))}
          </div>
        </div>
      )}

      {/* Estado vacío (Cuando no hay ninguna tarea) */}
      {todos.length === 0 && (
        <div className="mt-8 flex flex-col items-center justify-center rounded-4xl border-2 border-dashed border-[#e9ddff] bg-white/50 p-12 text-center">
          <span className="text-4xl">✨</span>
          <p className="mt-4 font-bold text-[#8058d3]">¡Todo limpio!</p>
          <p className="text-sm text-[#aaa2bd]">
            Aún no tienes tareas pendientes.
          </p>
        </div>
      )}
    </section>
  );
};
