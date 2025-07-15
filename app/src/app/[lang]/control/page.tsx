"use client";

import dynamic from "next/dynamic";

const App = dynamic(() => import("./App"), { ssr: false });

const Page = () => <App />;

export default Page;
