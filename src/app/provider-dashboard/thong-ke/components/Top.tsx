"use client";

import { useState } from "react";

const TopHours = {
  "08:00": 120,
  "09:00": 150,
  "10:00": 100,
  "11:00": 130,
  "12:00": 170,
  "13:00": 90,
  "14:00": 110,
  "15:00": 140,
  "16:00": 160,
  "17:00": 180,
};
export default function Top() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative cursor-pointer" onClick={() => setOpen(!open)}>
        <p className="text-xl font-semibold ">Top giờ nhiều vé</p>
        {open && (
          <div className="absolute shadow-md rounded-md p-2 bg-white">
            <p className="">Top giờ nhiều vé</p>
            <p className="">Top loại xe</p>
          </div>
        )}
      </div>
      <div>
        {Object.entries(TopHours).map(([hour, count]) => (
          <div key={hour} className="flex justify-between py-1">
            <span>{hour}</span>
            <span>{count} vé</span>
          </div>
        ))}
      </div>
    </>
  );
}
