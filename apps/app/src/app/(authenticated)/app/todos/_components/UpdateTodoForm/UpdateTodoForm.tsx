"use client";

import { Todo, Todos } from "@/db/types";
import { OptimisticUpdate } from "@/types/helpers";
import { useDialogTranisition } from "@/utils/hooks/use-dialog-transition";
import {
  Form,
  FormControl,
  FormField,
  FormFooter,
  FormHeader,
  FormItem,
  FormLabel,
  FormMessage,
  f,
  zodResolver,
} from "@playbook/forms";
import {
  Button,
  ButtonIcon,
  Calendar,
  Flex,
  IconButton,
  Input,
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
import { CalendarIcon, CheckCircle2, Pen } from "lucide-react";
import * as React from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { updateTodoContent } from "../../_api/update-todo";

const formSchema = z.object({
  content: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
  dueDate: z.date().optional(),
  description: z.string().optional(),
  project: z.string().optional(),
});

export const UpdateTodoForm = (props: {
  todo: Todo;
  optimisticUpdate: OptimisticUpdate<Todos>;
}) => {
  const [isPending, startTransition] = React.useTransition();

  const { open, setOpen } = useDialogTranisition({
    isPending,
    onClose: () => {
      form.reset();
    },
  });

  const form = f.useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: props.todo.content ? props.todo.content : "",
      dueDate: props.todo.dueDate ? props.todo.dueDate : new Date(),
      description: props.todo.description ? props.todo.description : "",
      project: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setOpen(false);

    startTransition(async () => {
      props.optimisticUpdate((data) => {
        const updateTodo = data.find((todo) => props.todo.uuid === todo.uuid);

        if (!updateTodo) {
          return data;
        }

        const newTodo: Todo = {
          ...updateTodo,
          ...values,
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
      await updateTodoContent({
        uuid: props.todo.uuid,
        ...values,
      });
      try {
      } catch (error) {
        toast.error("There was an error");
      }
    });
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <IconButton icon={<Pen />} className="invisible group-hover:visible" />
      </SheetTrigger>
      <SheetContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col h-full"
          >
            <FormHeader>
              {props.todo.status === "done" ? (
                <Button
                  className="w-60 text-green-600"
                  variant={"outline"}
                  size={"md"}
                >
                  <ButtonIcon Icon={<CheckCircle2 />} orientation={"leading"} />
                  Completed
                </Button>
              ) : (
                <Button className="w-60" size={"md"}>
                  <ButtonIcon Icon={<CheckCircle2 />} orientation={"leading"} />
                  Mark as completed
                </Button>
              )}
            </FormHeader>
            <Flex direction={"column"} gap={"lg"} grow>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="text-base font-medium" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea className="h-[240px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Due date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          size={"lg"}
                          className={cn(
                            "justify-start px-3",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <ButtonIcon
                            Icon={<CalendarIcon />}
                            orientation={"leading"}
                          />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="project"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">
                          m@example.com
                        </SelectItem>
                        <SelectItem value="m@google.com">
                          m@google.com
                        </SelectItem>
                        <SelectItem value="m@support.com">
                          m@support.com
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Flex>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
