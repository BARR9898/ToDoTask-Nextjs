"use client"; // Asegúrate de marcar el componente como cliente

import { useRouter } from "next/navigation"; // Usar 'next/navigation' para redirección
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import React from "react";

function EditUser({ params,datUser }) {
  const { id } = React.use(params); // Desempaqueta 'params' con React.use()
  const router = useRouter();
  const [user, setUser] = useState(null);
  const { register, handleSubmit, setValue } = useForm();

  console.log('datUser',datUser);
  
  useEffect(() => {
    console.log('use efect id',id);
    
    if (id) {
      // Realiza la solicitud para obtener los datos del usuario por 'id'
      fetch(`/api/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
          
          setUser(data.user);
          setValue("phone", data.user.phone); // Establece el valor en el formulario
          setValue("username", data.user.username); // Establece el valor en el formulario

        })
        .catch((error) => {
          console.error("Error al obtener los datos del usuario:", error);
        });
    }
  }, [id]);

  const onSubmit = (data) => {
    console.log('onSubmit data',data);
    
    // Enviar los cambios al backend
    fetch(`/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        phone: data.phone,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        router.push("/admin/users"); // Redirige al listado de usuarios
      } else {
        console.log("Error al actualizar el usuario");
      }
    });
  };

  if (!user) return <p>Cargando...</p>;

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-[450px] w-1/4 md:w-2/4 bg-opacity-30 border-2 shadow-lg bg-pink-100 rounded-lg p-2"
      >
        <h1 className="text-pink-900 font-bold mb-4 text-2xl flex justify-center items-center">
          Editar Usuario
        </h1>

        <label htmlFor="username" className="text-pink-900 mb-2 block text-sm">Username</label>
        <input
          className="p-3 rounded block mb-2  w-full shadow"
          type="text"
          {...register("username", { required: { value: true, message: "Username is required" } })}
          placeholder="username"
        />
        <label htmlFor="phone" className="text-pink-900 mb-2 block text-sm">
          Teléfono
        </label>
        <input
          className="p-3 rounded block mb-2 w-full shadow"
          type="text"
          {...register("phone", { required: true })}
          placeholder="Phone"
        />

        <label htmlFor="password" className="text-pink-900 mb-2 block text-sm shadow">
          Contraseña
        </label>
        <input
          className="p-3 rounded block mb-2 w-full"
          type="password"
          {...register("password")}
          placeholder="Password"
        />

        <button
          className="w-full bg-amber-900 bg-opacity-65 text-white p-3 rounded-lg mt-[60px]"
          type="submit"
        >
          Actualizar
        </button>
      </form>
    </div>
  );
}

export default EditUser;
