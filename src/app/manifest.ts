import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TaskPop - Gestor de Tareas",
    short_name: "TaskPop",
    description: "Organiza tus tareas diarias de forma rápida y visual.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#fbfaff",
    theme_color: "#9333ea",
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
