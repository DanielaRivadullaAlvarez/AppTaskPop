"use client";

import { useState, useTransition } from "react";
import { Todo } from "@prisma/client";
import { IoTrashOutline, IoRefreshOutline, IoCheckmark } from "react-icons/io5";
import { restoreTodos, hardDeleteTodos } from "../actions/todo-actions";

interface Props {
  todos: Todo[];
}

export const DeletedTodoList = ({ todos }: Props) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === todos.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(todos.map((t) => t.id));
    }
  };

  const handleRestore = () => {
    if (selectedIds.length === 0) return;
    startTransition(async () => {
      await restoreTodos(selectedIds);
      setSelectedIds([]);
    });
  };

  const handlePermanentDelete = () => {
    if (selectedIds.length === 0) return;

    const confirmado = window.confirm(
      "¿Seguro que quieres eliminar estas tareas definitivamente? Esta acción no se puede deshacer.",
    );

    if (!confirmado) return;

    startTransition(async () => {
      try {
        await hardDeleteTodos(selectedIds);
        setSelectedIds([]);
      } catch (error) {
        console.error("Error al eliminar las tareas:", error);
        alert("No se pudieron eliminar las tareas.");
      }
    });
  };
  return (
    <div className="w-full space-y-6">
      {/* Cabecera estilo TaskPop */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">Tareas anuladas</h1>
          <span className="px-3 py-1 text-xs font-semibold text-white bg-purple-600 rounded-full shadow-sm">
            {todos.length}{" "}
            {todos.length === 1 ? "tarea anulada" : "tareas anuladas"}
          </span>
        </div>

        {/* Botones de acción (se activan al tildar al menos una tarea) */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleRestore}
            disabled={selectedIds.length === 0 || isPending}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-700 bg-purple-100 rounded-full hover:bg-purple-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <IoRefreshOutline size={18} />
            Restablecer {selectedIds.length > 0 && `(${selectedIds.length})`}
          </button>

          <button
            onClick={handlePermanentDelete}
            disabled={selectedIds.length === 0 || isPending}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-full hover:bg-red-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <IoTrashOutline size={18} />
            Eliminar definitivamente{" "}
            {selectedIds.length > 0 && `(${selectedIds.length})`}
          </button>
        </div>
      </div>

      {/* Opción rápida para marcar/desmarcar todas */}
      {todos.length > 0 && (
        <div>
          <button
            type="button"
            onClick={toggleSelectAll}
            className="text-sm font-medium text-purple-600 hover:text-purple-800 transition"
          >
            {selectedIds.length === todos.length
              ? "Desmarcar todas"
              : "Seleccionar todas"}
          </button>
        </div>
      )}

      {/* Grid de tarjetas con el mismo estilo redondeado de Mis tareas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {todos.map((todo) => {
          const isSelected = selectedIds.includes(todo.id);

          return (
            <div
              key={todo.id}
              onClick={() => toggleSelect(todo.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition flex items-center gap-3 shadow-sm select-none ${
                isSelected
                  ? "bg-purple-50 border-purple-500 ring-1 ring-purple-500"
                  : "bg-white border-gray-100 hover:border-purple-200"
              }`}
            >
              {/* Checkbox circular estilo TaskPop */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border transition shrink-0 ${
                  isSelected
                    ? "bg-purple-600 border-purple-600 text-white"
                    : "border-gray-300 bg-gray-50"
                }`}
              >
                {isSelected && <IoCheckmark size={14} />}
              </div>

              <span className="text-gray-500 line-through font-medium truncate">
                {todo.description}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
