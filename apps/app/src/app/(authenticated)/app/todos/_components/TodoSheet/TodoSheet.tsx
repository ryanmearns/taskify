"use client";

import { Projects, Todo, Todos } from "@/db/types";
import { OptimisticUpdate } from "@/types/helpers";
import { useAction } from "@/utils/actions/hook";
import {
  Avatar,
  AvatarImage,
  Button,
  ButtonIcon,
  Calendar,
  Flex,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetContent,
  SheetTrigger,
  Textarea,
  cn,
} from "@playbook/ui";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle2 } from "lucide-react";
import * as React from "react";
import toast from "react-hot-toast";
import { updateTodoAction } from "../../_api/update-todo";
import { updateTodoDueDateAction } from "../../_api/update-todo-due-date";
import { updateTodoProject } from "../../_api/update-todo-project";
import { updateTodoStatusAction } from "../../_api/update-todo-status-form";

export const TodoSheet = (props: {
  children: React.ReactNode;
  todo: Todo;
  projects: Projects;
  optimisticUpdate: OptimisticUpdate<Todos>;
}) => {
  return (
    <Sheet>
      <SheetTrigger className="grow" asChild>
        {props.children}
      </SheetTrigger>
      <SheetContent size={"xl"} className="overflow-scroll">
        <div className="space-y-4 flex flex-col h-full">
          <Flex direction={"column"} gap={"lg"} grow>
            <UpdateTodoStatus
              todo={props.todo}
              optimisticUpdate={props.optimisticUpdate}
            />
            <UpdateTodoContent
              todo={props.todo}
              optimisticUpdate={props.optimisticUpdate}
            />
            <UpdateTodoDescription
              todo={props.todo}
              optimisticUpdate={props.optimisticUpdate}
            />
            <UpdateTodoDueDate
              todo={props.todo}
              optimisticUpdate={props.optimisticUpdate}
            />
            <UpdateTodoProject
              todo={props.todo}
              projects={props.projects}
              optimisticUpdate={props.optimisticUpdate}
            />
          </Flex>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const UpdateTodoStatus = (props: {
  todo: Todo;
  optimisticUpdate: OptimisticUpdate<Todos>;
}) => {
  const action = useAction(updateTodoStatusAction, {
    onMutate: () => {
      props.optimisticUpdate((data) => {
        const updateTodo = data.find((todo) => props.todo.uuid === todo.uuid);

        if (!updateTodo) {
          return data;
        }

        const newTodo: Todo = {
          ...updateTodo,
          status: props.todo.status === "todo" ? "done" : "todo",
        };

        const newTodos = data.map((todo) => {
          if (todo.uuid === newTodo.uuid) {
            return newTodo;
          } else {
            return todo;
          }
        });

        return newTodos;
      });
    },
  });

  return (
    <>
      {props.todo.status === "done" ? (
        <Button
          className="w-60 text-green-600 hover:text-green-500"
          variant={"outline"}
          size={"md"}
          onClick={() =>
            action.execute({ uuid: props.todo.uuid, status: "todo" })
          }
        >
          <ButtonIcon Icon={<CheckCircle2 />} orientation={"leading"} />
          Completed
        </Button>
      ) : (
        <Button
          className="w-60"
          size={"md"}
          onClick={() =>
            action.execute({ uuid: props.todo.uuid, status: "done" })
          }
        >
          <ButtonIcon Icon={<CheckCircle2 />} orientation={"leading"} />
          Mark as completed
        </Button>
      )}
    </>
  );
};

const UpdateTodoContent = (props: {
  todo: Todo;
  optimisticUpdate: OptimisticUpdate<Todos>;
}) => {
  const action = useAction(updateTodoAction, {
    onMutate: (input) => {
      props.optimisticUpdate((data) => {
        const updateTodo = data.find((todo) => props.todo.uuid === todo.uuid);

        if (!updateTodo) {
          return data;
        }

        const newTodo: Todo = {
          ...updateTodo,
          ...input,
        };

        const newTodos = data.map((todo) => {
          if (todo.uuid === newTodo.uuid) {
            return newTodo;
          } else {
            return todo;
          }
        });

        return newTodos;
      });
    },
    onError: () => {
      toast.error("There was an error");
    },
  });

  return (
    <Input
      className="text-base font-medium"
      placeholder="Write a task name"
      min={1}
      defaultValue={props.todo.content ? props.todo.content : ""}
      onBlur={(e) => {
        if (e.target.value.length > 0) {
          action.execute({ uuid: props.todo.uuid, content: e.target.value });
        }
      }}
    />
  );
};

const UpdateTodoDescription = (props: {
  todo: Todo;
  optimisticUpdate: OptimisticUpdate<Todos>;
}) => {
  const action = useAction(updateTodoAction, {
    onMutate: (input) => {
      props.optimisticUpdate((data) => {
        const updateTodo = data.find((todo) => props.todo.uuid === todo.uuid);

        if (!updateTodo) {
          return data;
        }

        const newTodo: Todo = {
          ...updateTodo,
          ...input,
        };

        const newTodos = data.map((todo) => {
          if (todo.uuid === newTodo.uuid) {
            return newTodo;
          } else {
            return todo;
          }
        });

        return newTodos;
      });
    },
    onError: () => {
      toast.error("There was an error");
    },
  });

  return (
    <Textarea
      className="h-60"
      defaultValue={props.todo.description ? props.todo.description : ""}
      placeholder="What is the task about?"
      onBlur={(e) =>
        action.execute({ uuid: props.todo.uuid, description: e.target.value })
      }
    />
  );
};

const UpdateTodoDueDate = (props: {
  todo: Todo;
  optimisticUpdate: OptimisticUpdate<Todos>;
}) => {
  const dueDate = props.todo.dueDate ? props.todo.dueDate : undefined;

  const action = useAction(updateTodoDueDateAction, {
    onMutate: (input) => {
      props.optimisticUpdate((data) => {
        const updateTodo = data.find((todo) => props.todo.uuid === todo.uuid);

        if (!updateTodo) {
          return data;
        }

        const newTodo: Todo = {
          ...updateTodo,
          dueDate: input.dueDate,
        };

        const newTodos = data.map((todo) => {
          if (todo.uuid === newTodo.uuid) {
            return newTodo;
          } else {
            return todo;
          }
        });

        return newTodos;
      });
    },
    onError: () => {
      toast.error("There was an error");
    },
  });

  return (
    <Flex direction={"column"} gap={"sm"}>
      <Label>Due date</Label>
      <Flex align={"center"} gap={"md"}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              size={"lg"}
              className={cn(
                "justify-start px-3 w-full",
                !props.todo.dueDate && "text-muted-foreground"
              )}
            >
              <ButtonIcon Icon={<CalendarIcon />} orientation={"leading"} />
              {props.todo.dueDate ? (
                format(props.todo.dueDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" p-0" align="start">
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
                  action.execute({
                    uuid: props.todo.uuid,
                    dueDate: date,
                  });
                }
              }}
            />
          </PopoverContent>
        </Popover>
      </Flex>
    </Flex>
  );
};

const UpdateTodoProject = (props: {
  todo: Todo;
  projects: Projects;
  optimisticUpdate: OptimisticUpdate<Todos>;
}) => {
  const action = useAction(updateTodoProject, {
    onMutate: (input) => {
      props.optimisticUpdate((data) => {
        const updateTodo = data.find((todo) => props.todo.uuid === todo.uuid);

        if (!updateTodo) {
          return data;
        }

        const projectVal =
          input.projectUuid === "No project" ? null : input.projectUuid;

        const newTodo: Todo = {
          ...updateTodo,
          projectUuid: projectVal,
        };

        const newTodos = data.map((todo) => {
          if (todo.uuid === newTodo.uuid) {
            return newTodo;
          } else {
            return todo;
          }
        });

        return newTodos;
      });
    },
    onError: () => {
      toast.error("There was an error");
    },
  });

  return (
    <Flex direction={"column"} gap={"sm"}>
      <Label>Project</Label>
      <Flex gap={"sm"} align={"center"}>
        <Select
          onValueChange={(val) => {
            action.execute({ uuid: props.todo.uuid, projectUuid: val });
          }}
          value={props.todo.projectUuid ? props.todo.projectUuid : "No project"}
        >
          <SelectTrigger>
            <SelectValue placeholder="No project selected" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"No project"}>
              <span className="flex gap-2 items-center">No project</span>
            </SelectItem>
            {props.projects.map((project) => (
              <SelectItem key={project.uuid} value={project.uuid}>
                <span className="flex gap-2 items-center">
                  <Avatar className="h-4 w-4">
                    <AvatarImage
                      src={`https://avatar.vercel.sh/${project.name}`}
                    />
                  </Avatar>
                  {project.name}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Flex>
    </Flex>
  );
};
