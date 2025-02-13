"use client";
import { signIn } from "next-auth/react";
import { Suspense } from "react";
import { GrGoogle } from "react-icons/gr";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="flex flex-col gap-3.5 items-center justify-between">
        <Suspense>
          <h1>Connectez vous</h1>
          <button
            onClick={() => signIn("google", { redirectTo: "/dashboard" })}
            className="px-6 flex items-center gap-4 cursor-pointer transition-colors py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          >
            <GrGoogle /> Se connecter avec Google
          </button>
        </Suspense>
      </div>
    </main>
  );
}
