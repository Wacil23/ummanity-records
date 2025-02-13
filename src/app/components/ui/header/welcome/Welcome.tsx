"use client";
import { isAdmin } from "@/data/permissions";
import { useSession } from "next-auth/react";
import React from "react";

const Welcome = () => {
  const { data: session } = useSession();
  const permission = isAdmin(session?.user?.name ?? "")
    ? "Admin"
    : "Media Buyer";
  return (
    <h1 className="text-md md:text-xl flex items-end gap-2">
      Welcome, <span className="font-bold ">{session?.user?.name}</span>
      <span className="text-xs text-gray-500">{permission}</span>
    </h1>
  );
};

export default Welcome;
