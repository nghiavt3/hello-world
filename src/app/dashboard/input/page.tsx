"use client";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { ref, push } from "firebase/database";

export default function InputReport() {
  const [data, setData] = useState({ doanhThu: "", chiPhi: "", loiNhuan: "" });

  const handleSubmit = (e :any) => {
    e.preventDefault();
    push(ref(db, "reports/"), data);
    alert("Dữ liệu đã được lưu!");
  };

  return (
    <div>
      <h1>Nhập báo cáo tài chính</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Doanh thu" onChange={(e) => setData({ ...data, doanhThu: e.target.value })} />
        <input type="text" placeholder="Chi phí" onChange={(e) => setData({ ...data, chiPhi: e.target.value })} />
        <input type="text" placeholder="Lợi nhuận" onChange={(e) => setData({ ...data, loiNhuan: e.target.value })} />
        <button className="bg-green-500 text-white p-2">Lưu báo cáo</button>
      </form>
    </div>
  );
}
