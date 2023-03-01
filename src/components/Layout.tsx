import { Navbar } from "./Navbar";
import Head from "next/head";

export function Layout({ children }: { children: any }) {
  console.log("children in layout", children)
  return (
    <div className="w-full max-w-md space-y-8 rounded-lg px-4 py-4">
      <Head>
        <title>Connect RYFT</title>
        <link rel="shortcut icon" href="favicon.ico" />
      </Head>
      <div>
        <Navbar />
        <h2 className="mt-6 text-center text-2xl font-mont tracking-wider text-white uppercase">
          Welcome to Ryft Pass
        </h2>
      </div>
      <div>{children}</div>
    </div>
  );
}
