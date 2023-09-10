import { Task } from "@prisma/client";
import React, { useTransition } from "react";
import { Checkbox } from "./ui/checkbox";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { setTaskDone } from "@/actions/task";
import { useRouter } from "next/navigation";

interface props {
  task: Task;
}

function getExpirationColor(date: Date) {
  const days = Math.floor(date.getTime() - Date.now()) / 1000 / 60 / 60;
  if (days < 0) return "text-gray-300 dark:text-gray-400";
  if (days <= 3 * 24) return "text-red-500 dark:text-red-400";
  if (days <= 7 * 24) return "text-orange-500 dark:text-orange-400";
  return "text-green-500 dark:text-green-400";
}
export default function TaskCard({ task }: props) {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  return (
    <div className="flex gap-2 items-start">
      <Checkbox
        id={task.id.toString()}
        className="h-5 w-5 "
        checked={task.done}
        disabled={task.done || isLoading}
        onCheckedChange={() => {
          startTransition(async () => {
            await setTaskDone(task.id);
            router.refresh();
          });
        }}
      />
      <label
        htmlFor={task.id.toString()}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 decoration-1 dark:decoration-white",
          task.done && "line-through"
        )}
      >
        {task.content}
        {task.expireAt && (
          <p
            className={cn(
              "text-sm text-neutral-500 dark:text-neutral-400",
              getExpirationColor(task.expireAt)
            )}
          >
            {format(task.expireAt, "dd/MM/yyyy")}
          </p>
        )}
      </label>
    </div>
  );
}
