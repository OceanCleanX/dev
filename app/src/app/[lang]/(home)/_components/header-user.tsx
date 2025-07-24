"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";

const HeaderUser = () => {
  const t = useTranslations("header");
  const { data: session } = useSession();

  return (
    <div className="h-12 flex items-center justify-between">
      {!session ? (
        <Link
          className="bg-primary rounded-lg font-medium text-white px-4 py-1.5"
          href="/login"
        >
          {t("login")}
        </Link>
      ) : (
        <Link href="/control" className="flex items-center space-x-3">
          <span>{session.user.name}</span>
          <Image
            className="size-9 rounded-full"
            alt={`${session.user.name} avatar`}
            src="/avatar.png"
            width={64}
            height={64}
          />
        </Link>
      )}
    </div>
  );
};

export default HeaderUser;
