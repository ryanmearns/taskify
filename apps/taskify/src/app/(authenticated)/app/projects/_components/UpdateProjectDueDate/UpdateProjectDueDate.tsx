"use client";

import { Project } from "@/db/types";
import { useAction } from "@/utils/actions/hook";
import {
  Button,
  ButtonIcon,
  Calendar,
  cn,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@playbook/ui";
import { format, isPast, isToday, isTomorrow } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { updateProjectDueDateAction } from "../../_api/update-project-due-date";
import * as React from "react";

export const UpdateProjectDueDate = (props: { project: Project }) => {
  const [dueDate, setDueDate] = React.useState(
    props.project.dueDate ? props.project.dueDate : undefined
  );

  const action = useAction(updateProjectDueDateAction);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            (dueDate && isToday(dueDate) && "text-yellow-600") ||
              (dueDate && isTomorrow(dueDate) && "text-blue-600") ||
              (dueDate && isPast(dueDate), "flex-none")
          )}
        >
          {dueDate ? (
            <>
              <ButtonIcon orientation="leading" Icon={<CalendarIcon />} />
              {isToday(dueDate) && <span>Today</span>}
              {isTomorrow(dueDate) && <span>Tomorrow</span>}
              {!isToday(dueDate) && !isTomorrow(dueDate) && (
                <span>{format(dueDate, "PP")}</span>
              )}
            </>
          ) : (
            <span className="text-muted-foreground font-normal">No date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={dueDate}
          disabled={(date) => {
            let d = new Date();
            d.setDate(d.getDate() - 1);
            return date < d;
          }}
          onSelect={(date) => {
            if (date) {
              setDueDate(date);
              action.execute({
                uuid: props.project.uuid,
                dueDate: date,
              });
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
