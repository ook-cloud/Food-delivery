"use client";

import { useState } from "react";
import { Sidebar } from "./_components/Sidebar";
import Dishes from "./dishes/page";
import OrdersPage from "./orders/page";

export default function Admin() {
  const [state, setState] = useState(1);
  const first = state === 1;
  const second = state === 2;

  return (
    <div className="flex min-h-screen w-full bg-[#F4F4F5]">
      <Sidebar setState={setState} state={state} />
      {first && <Dishes />}
      {second && <OrdersPage />}
    </div>
  );
}
