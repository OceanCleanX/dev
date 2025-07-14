"use client";

import { Link } from "@/i18n/navigation";
import userAtom from "@/stores/user";
import { useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import Image from "next/image";

const HeaderUser = () => {
  const t = useTranslations("header");
  const user = useAtomValue(userAtom);

  return (
    <div className="h-12 flex items-center justify-between">
      {!user ? (
        <Link
          className="bg-primary rounded-lg font-medium text-white"
          href="/control"
        >
          {t("login")}
        </Link>
      ) : (
        <Link href="/user" className="flex items-center space-x-3">
          <span>{user}</span>
          <Image
            className="size-9 rounded-full"
            alt={`${user} avatar`}
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
