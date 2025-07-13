"use client";

import { Link } from "@/i18n/navigation";
import userAtom from "@/stores/user";
import { useAtomValue } from "jotai";
import Image from "next/image";

const HeaderUser = () => {
  const user = useAtomValue(userAtom);

  return (
    <div className="h-12 flex items-center justify-between">
      {!user ? (
        <Link
          className="bg-[#318591] rounded-lg font-medium text-white"
          href="/control"
        >
          Login
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
