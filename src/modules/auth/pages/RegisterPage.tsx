// src/modules/auth/pages/RegisterPage.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/auth.store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const registerSchema = z
  .object({
    email: z.string().email({ message: "Correo inválido" }),
    password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterPage = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setErrorMessage("");
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    if (authData.user) {
      setUser(authData.user);
      navigate("/");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Crear cuenta</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Correo electrónico</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Contraseña</label>
          <input
            type="password"
            {...register("password")}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Confirmar contraseña</label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {errorMessage && <p className="text-red-600">{errorMessage}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          {isSubmitting ? "Registrando..." : "Crear cuenta"}
        </button>
      </form>
    </div>
  );
};
