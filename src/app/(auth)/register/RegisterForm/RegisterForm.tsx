"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, registerSchemaType } from "../schema/register.schema";
import { registerFn } from "../actions/register.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function RegisterForm() {
  const router = useRouter()

  const [isLoading , setLoading]=useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "", 
      phone: "",
    },
  });

  async function handelRegister(data: registerSchemaType) {
    setLoading(true)
    try {
      const isSuccess = await registerFn(data);
      if (isSuccess) {
        toast.success('user creater succesfully',{
          position:'top-center',
          style: {
          border: '1px solid #22c55e', 
          padding: '16px',
          color: '#14532d', 
          background: '#f0fdf4', 
        },
        })
        setTimeout(()=>{
          router.push('/login');
        },500);
        reset()
      }
    } catch (error:any) {
      toast.error(error?.message,{
          position:'top-center',
          style: {
        border: '1px solid #ef4444', 
        padding: '16px',
        color: '#7f1d1d', 
        background: '#fef2f2', 
      },
        })
    }finally{
      setLoading(false)
    }
  }

  return (
    <div>
      <form className="w-2/3 mx-auto my-5" onSubmit={handleSubmit(handelRegister)}>
        <FieldGroup>

          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input {...field} id="name" placeholder="name" autoComplete="off" />
                {fieldState.error && <FieldError message={fieldState.error.message} />}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input {...field} id="email" placeholder="email" autoComplete="off" type="email" />
                {fieldState.error && <FieldError message={fieldState.error.message} />}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input {...field} id="password" placeholder="password" autoComplete="off" type="password" />
                {fieldState.error && <FieldError message={fieldState.error.message} />}
              </Field>
            )}
          />

          <Controller
            name="rePassword" 
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="rePassword">Confirm Password</FieldLabel>
                <Input {...field} id="rePassword" placeholder="confirm password" autoComplete="off" type="password" />
                {fieldState.error && <FieldError message={fieldState.error.message} />}
              </Field>
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                <Input {...field} id="phone" placeholder="phone" autoComplete="off" type="tel" />
                {fieldState.error && <FieldError message={fieldState.error.message} />}
              </Field>
            )}
          />

        </FieldGroup>

        <Button className="my-5" type="submit">
          {isLoading?<Spinner></Spinner>:'Register'}
        </Button>
      </form>
    </div>
  );
}

function FieldGroup({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`space-y-2 mb-4 ${className}`}>{children}</div>;
}

function Field({ children, ...props }: { children: React.ReactNode; [key: string]: any }) {
  return <div className="flex flex-col gap-1" {...props}>{children}</div>;
}

function FieldLabel({ children, htmlFor }: any) {
  return <label htmlFor={htmlFor} className="font-medium">{children}</label>;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-red-500 text-sm">{message}</p>;
}