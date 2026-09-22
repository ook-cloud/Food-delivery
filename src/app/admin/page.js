"use client";
import Dishes from "./dishes/page";
import { useState } from "react";
import Orders from "./orders/page";
import { Sidebar } from "./_components/sidebar";
export default function Admin() {
  const [state, setState] = useState(1);
  const first = state === 1;
  const second = state === 2;

  return (
    <div className="flex min-h-screen w-full bg-[#F4F4F5]">
      <Sidebar setState={setState} state={state} />
      {first && <Dishes />}
      {second && <Orders />}
    </div>
  );
}