"use client";

import dynamic from "next/dynamic";

const AgoraProvider = dynamic(() => import("./agora"), { ssr: false });

export default AgoraProvider;
