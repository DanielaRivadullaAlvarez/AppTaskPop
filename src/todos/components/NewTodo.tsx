"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { FiPlus } from "react-icons/fi";
import { addTodo } from "../actions/todo-actions";

export const NewTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const tarea = description.trim();
    if (tarea.length < 3) {
      alert("Escribe al menos 3 caracteres.");
      return;
    }

    const tareaFormateada = tarea.charAt(0).toUpperCase() + tarea.slice(1);

    await addTodo(tareaFormateada);
    setDescription("");
  };

  return (
    <section className="rounded-[28px] border border-[#f5f1ff] bg-white p-6 shadow-[0_4px_20px_rgba(94,71,146,0.03)]">
      <h2 className="mb-4 text-lg font-extrabold text-[#242038]">
        Nueva tarea ✨
      </h2>

      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="¿Qué necesitas hacer?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          minLength={3}
          className="min-w-0 flex-1 rounded-2xl border border-[#eeeaf6] bg-[#fbfaff] px-4 py-3 text-sm outline-none transition placeholder:text-[#aaa2bd] focus:border-[#c9b7f2]"
        />

        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-2xl bg-[#c8f36d] px-5 py-3 text-sm font-extrabold text-[#33421c] transition hover:bg-[#bde85f]"
        >
          <FiPlus size={17} />
          Añadir tarea
        </button>
      </form>
    </section>
  );
};
