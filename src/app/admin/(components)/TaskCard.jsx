"use client";
import { Trash, Edit } from "lucide-react";
import { useRouter } from "next/navigation";

function TaskCard({ task, onTaskDeleted }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm("¿Estás seguro de que deseas eliminar esta tarea?");
    if (confirmed) {
      try {
        const res = await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          throw new Error("Error al eliminar la tarea.");
        }

        alert("Tarea eliminada exitosamente.");
        onTaskDeleted(); // Llama a la función para recargar tareas
      } catch (error) {
        console.error(error.message);
        alert("No se pudo eliminar la tarea.");
      }
    }
  };

  const handleEdit = async () => {
    router.push(`/admin/tasks/update/${task.id}`);
  };

  return (
    <div className="w-[350px] h-[250px] border-2 shadow-md rounded-lg">
      <section className="w-full max-h-10 flex justify-start items-center p-2">
        <h1 className="text-2xl font-bold">{task.title}</h1>
      </section>
      <section className="w-full max-h-[100px] text-justify p-2 overflow-auto">
        {task.description}
      </section>
      <section className="w-full h-[100px] flex items-center justify-center space-x-3">
        <button
          onClick={handleEdit}
          className="w-[150px] h-8 bg-blue-200 hover:bg-blue-300 shadow-md rounded-md flex items-center justify-evenly"
        >
          <Edit />
          Editar
        </button>

        <button
          onClick={handleDelete}
          className="w-[150px] h-8 bg-red-700 hover:bg-red-800 text-white shadow-md rounded-md flex items-center justify-evenly"
        >
          <Trash />
          Eliminar
        </button>
      </section>
    </div>
  );
}

export default TaskCard;