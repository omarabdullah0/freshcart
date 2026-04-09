"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginSchema, loginSchemaType } from "./schema/login.schema";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handelLogin(data: loginSchemaType) {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        ...data,
      });

      if (result?.error) {
        toast.error("Incorrect email or password", {
          position: "top-center",
          style: {
            border: "1px solid #ef4444",
            padding: "16px",
            color: "#7f1d1d",
            background: "#fef2f2",
          },
        });
      } else {
        toast.success("Successfully Login", {
          position: "top-center",
          style: {
            border: "1px solid #22c55e",
            padding: "16px",
            color: "#14532d",
            background: "#f0fdf4",
          },
        });
        
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 500);
        reset();
      }
    } catch (error: any) {
      toast.error("Something went wrong", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form
        className="w-2/3 mx-auto my-5"
        onSubmit={handleSubmit(handelLogin)}
      >
        <FieldGroup>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  placeholder="email"
                  autoComplete="off"
                  type="email"
                />
                {fieldState.error && (
                  <FieldError message={fieldState.error.message} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  {...field}
                  id="password"
                  placeholder="password"
                  autoComplete="off"
                  type="password"
                />
                {fieldState.error && (
                  <FieldError message={fieldState.error.message} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Button className="my-5" type="submit" disabled={isLoading}>
          {isLoading ? <Spinner /> : "Login"}
        </Button>
        <p className="text-sm text-gray-600 mt-2">
          Don't have an account?{" "}
          <Link href="/register" className="text-green-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

function FieldGroup({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`space-y-2 mb-4 ${className}`}>{children}</div>;
}

function Field({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <div className="flex flex-col gap-1" {...props}>
      {children}
    </div>
  );
}

function FieldLabel({ children, htmlFor }: any) {
  return (
    <label htmlFor={htmlFor} className="font-medium">
      {children}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-red-500 text-sm">{message}</p>;
}