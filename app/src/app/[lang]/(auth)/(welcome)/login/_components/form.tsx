"use client";

import { useCallback } from "react";
import z from "zod/v4";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";

import { signIn } from "@/lib/auth-client";
import { Link, redirect } from "@/i18n/navigation";
import { Form, Input, Submit } from "@/components/ui/form";

import type { SubmitHandler } from "react-hook-form";

const USERNAME_MIN = 6;
const USERNAME_MAX = 20;
const PASSWORD_MIN = 8;
const PASSWORD_MAX = 25;

const LoginSchema = z.object({
  username: z
    .string()
    .nonempty("require-username")
    .min(USERNAME_MIN, "too-short")
    .max(USERNAME_MAX, "too-long"),
  password: z
    .string()
    .nonempty("require-password")
    .min(PASSWORD_MIN, "too-short")
    .max(PASSWORD_MAX, "too-long")
    .regex(/[a-z]/, "require-lowercase")
    .regex(/[A-Z]/, "require-uppercase")
    .regex(/[0-9]/, "require-number"),
});
type LoginSchemaType = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const t = useTranslations("auth");
  const locale = useLocale();

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });
  const onSubmit: SubmitHandler<LoginSchemaType> = useCallback(
    async (data) => {
      const { error } = await signIn.username(data);
      if (!error) {
        redirect({ href: "/", locale });
        return;
      }

      switch (error.code) {
        case "INVALID_USERNAME_OR_PASSWORD":
          setError("username", {
            type: "manual",
            message: "invalid-username-or-password",
          });
          break;
        default:
          setError("username", { type: "manual", message: "unknown-error" });
          console.error(error.code);
      }
    },
    [locale, setError],
  );

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label={t("username")}
        errorMsg={
          errors.username?.message &&
          t(errors.username.message, { min: USERNAME_MIN, max: USERNAME_MAX })
        }
        {...register("username")}
      />
      <Input
        label={t("password")}
        errorMsg={
          errors.password?.message &&
          t(errors.password.message, { min: PASSWORD_MIN, max: PASSWORD_MAX })
        }
        {...register("password")}
        type="password"
        subText={
          <Link href="/forgot-password" className="text-blue-400">
            {t("login.forgot-password")}
          </Link>
        }
      />
      <Submit loading={isSubmitting} className="mt-5">
        {t("login.login-button")}
      </Submit>
    </Form>
  );
};

export default LoginForm;
