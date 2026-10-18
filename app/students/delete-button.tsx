"use client";

import { useTransition } from "react";
import { deleteStudent } from "./actions";

type DeleteButtonProps = {
  id: number;
};

export default function DeleteButton({ id }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!window.confirm("คุณต้องการลบนักศึกษาคนนี้ใช่หรือไม่?")) {
      return;
    }

    startTransition(async () => {
      await deleteStudent(id);
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-wait disabled:opacity-60"
    >
      {isPending ? "กำลังลบ..." : "ลบ"}
    </button>
  );
}