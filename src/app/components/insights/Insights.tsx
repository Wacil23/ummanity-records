"use client";

import Image from "next/image";
import { IoShareSocialSharp } from "react-icons/io5";
import { PiPlugsConnectedFill } from "react-icons/pi";
import { useSalary } from "@/app/contexts/SalaryContext";
import { useEffect } from "react";
import AnimatedNumber from "../ui/animated/AnimatedNumber";
import { useMeta } from "@/app/contexts/MetaContext";
import Skeleton from "../ui/skeleton/Skeleton";

export const InsightsClient = () => {
  const { setTotalMetaSpend } = useSalary();
  const { data } = useMeta();

  const totalSpend = data
    ? data.insights.reduce(
        (acc, insight) => acc + Number(insight.data.summary.spend),
        0
      )
    : 0;

  useEffect(() => {
    setTotalMetaSpend(totalSpend);
  }, [totalSpend, setTotalMetaSpend]);

  return (
    <div className="shadow-sm flex flex-col  rounded-lg">
      <div className="flex gap-4 px-8 py-4">
        <Image
          src="https://static.xx.fbcdn.net/rsrc.php/yb/r/CnOoIyhtLSO.svg"
          alt="Meta"
          width={50}
          height={50}
          className=" min-w-11  rounded-md p-2"
        />
        <div className="flex flex-col w-full">
          <p className="text-xl font-bold text-blue-500">Meta</p>
          <div className="flex flex-col md:flex-row gap-1 md:gap-4">
            <div className="flex  gap-1 items-center">
              <IoShareSocialSharp size={20} className="p-1 text-blue-400" />
              <p className="text-xs md:text-sm text-gray-500">Social Media</p>
            </div>
            <div className="flex gap-1 items-center">
              <PiPlugsConnectedFill size={20} className="p-1 text-blue-400" />
              <p className="text-xs md:text-sm text-gray-500">
                Connected Account : {data?.insights.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 px-8 py-4">
        <Skeleton
          loading={!data}
          animationSpeed={0.5}
          width="w-full"
          height="h-10"
        >
          <div className="flex items-center justify-between">
            {data?.insights.map((insight, index: number) => {
              const spend = Number(insight.data.summary.spend);
              return (
                <div key={index} className="flex flex-col gap-2">
                  <h2 className="text-sm md:text-xl font-medium">
                    {insight.name}
                  </h2>
                  <div className="flex flex-col gap-4">
                    <AnimatedNumber value={spend} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm md:text-xl font-medium">Total :</p>
            <AnimatedNumber value={totalSpend} />
          </div>
        </Skeleton>
      </div>
    </div>
  );
};
