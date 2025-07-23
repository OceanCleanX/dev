import { useTranslations } from "next-intl";
import LoginForm from "./_components/form";
import { Link } from "@/i18n/navigation";

const Page = () => {
  const t = useTranslations("auth.login");

  return (
    <div className="flex flex-col justify-between h-full mt-8 w-80">
      <LoginForm />
      <div className="mx-auto w-fit whitespace-pre-line text-sm text-blue-400 text-center">
        <Link href="/register">{t("new")}</Link>
      </div>
    </div>
  );
};

export default Page;
