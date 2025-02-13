"use client";
import { useSalary } from "@/app/contexts/SalaryContext";
import { useSession } from "next-auth/react";
import React from "react";

const SalaryClient = () => {
  const { salary } = useSalary();
  const { data: session } = useSession();
  const { agencySalary, personSalary, previsionalSalary } = salary;
  console.log("session");
  const personSalaryFormatted = personSalary.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
  const agencySalaryFormatted = agencySalary.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
  const previsionalSalaryFormatted = previsionalSalary.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
  return (
    <div>
      <p>
        Salaire {session?.user?.name} :{" "}
        <span className="font-semibold">{personSalaryFormatted}</span>
      </p>
      <p>
        Salaire prévisionnel :{" "}
        <span className="font-semibold">{previsionalSalaryFormatted}</span>
      </p>
      <p>
        Salaire de l&apos;agence :{" "}
        <span className="font-semibold">{agencySalaryFormatted}</span>
      </p>
    </div>
  );
};

export default SalaryClient;
