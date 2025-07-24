"use client";

import { useCallback } from "react";
import z from "zod/v4";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";

import { signUp } from "@/lib/auth-client";
import { redirect } from "@/i18n/navigation";
import { Form, Input, Submit } from "@/components/ui/form";

import type { SubmitHandler } from "react-hook-form";

const USERNAME_MIN = 6;
const USERNAME_MAX = 20;
const PASSWORD_MIN = 8;
const PASSWORD_MAX = 25;

const LoginSchema = z
  .object({
    name: z
      .string()
      .nonempty("require-username")
      .min(USERNAME_MIN, "too-short")
      .max(USERNAME_MAX, "too-long"),
    email: z.email("invalid-email"),
    password: z
      .string()
      .nonempty("require-password")
      .min(PASSWORD_MIN, "too-short")
      .max(PASSWORD_MAX, "too-long")
      .regex(/[a-z]/, "require-lowercase")
      .regex(/[A-Z]/, "require-uppercase")
      .regex(/[0-9]/, "require-number"),
    confirmPassword: z.string().nonempty("require-confirm-password"),
  })
  .refine(
    (obj) => obj.password === obj.confirmPassword,
    "invalid-confirm-password",
  );
type RegisterSchemaType = z.infer<typeof LoginSchema>;

const RegisterForm = () => {
  const t = useTranslations("auth");
  const locale = useLocale();

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(LoginSchema) });
  const onSubmit: SubmitHandler<RegisterSchemaType> = useCallback(
    async (data) => {
      const { error } = await signUp.email(data);
      if (!error) {
        redirect({ href: "/", locale });
        return;
      }

      switch (error.code) {
        default:
          console.error(error.code);
          setError("name", { type: "manual", message: "unknown-error" });
      }
    },
    [locale, setError],
  );

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label={t("username")}
        errorMsg={
          errors.name?.message &&
          t(errors.name.message, { min: USERNAME_MIN, max: USERNAME_MAX })
        }
        {...register("name")}
      />
      <Input
        label={t("email")}
        errorMsg={errors.email?.message && t(errors.email.message)}
        {...register("email")}
      />
      <Input
        label={t("password")}
        errorMsg={
          errors.password?.message &&
          t(errors.password.message, { min: PASSWORD_MIN, max: PASSWORD_MAX })
        }
        {...register("password")}
        type="password"
      />
      <Input
        label={t("confirm-password")}
        errorMsg={
          errors.confirmPassword?.message && t(errors.confirmPassword.message)
        }
        {...register("confirmPassword")}
        type="password"
      />
      <Submit loading={isSubmitting} className="mt-5">
        {t("register.register-button")}
      </Submit>
    </Form>
  );
};

export default RegisterForm;
