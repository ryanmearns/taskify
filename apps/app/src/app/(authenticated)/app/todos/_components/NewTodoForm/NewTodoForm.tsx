"use client";

import { Project, Projects } from "@/db/types";
import {
  f,
  Form,
  FormControl,
  FormField,
  FormFooter,
  FormHeader,
  FormItem,
  FormLabel,
  FormMessage,
  FormTitle,
  zodResolver,
} from "@playbook/forms";
import {
  Avatar,
  AvatarImage,
  Button,
  ButtonIcon,
  Calendar,
  cn,
  Dialog,
  DialogContent,
  DialogTrigger,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@playbook/ui";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Plus } from "lucide-react";
import * as React from "react";
import { toast } from "react-hot-toast";
import z from "zod";
import { addTodoAction } from "../../_api/add-todo";
import { useDialogTranisition } from "@/utils/hooks/use-dialog-transition";

const formSchema = z.object({
  content: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
  description: z.string().optional(),
  dueDate: z.date().optional(),
  projectUuid: z.string().optional(),
});

export const NewTodoForm = (props: {
  projects: Projects;
  defaultProject?: Project;
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
      content: "",
      description: "",
      projectUuid: props.defaultProject?.uuid
        ? props.defaultProject?.uuid
        : undefined,
      dueDate: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        await addTodoAction({
          ...values,
        });
        setOpen(false);
      } catch (error) {
        toast.error("There was an error");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="solid" block>
          Create todo
          <ButtonIcon Icon={<Plus />} orientation={"trailing"} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormHeader>
              <FormTitle>Create a todo</FormTitle>
            </FormHeader>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea disabled={isPending} {...field} />
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
                        disabled={isPending}
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
                        disabled={(date) => {
                          let d = new Date();
                          d.setDate(d.getDate() - 1);
                          return date < d;
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectUuid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger disabled={isPending}>
                        <SelectValue placeholder="No project selected" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"No project"}>
                        <span className="flex gap-2 items-center">
                          No project
                        </span>
                      </SelectItem>
                      {props.projects.map((project) => (
                        <SelectItem key={project.uuid} value={project.uuid}>
                          <span className="flex gap-2 items-center">
                            <Avatar className="h-4 w-4">
                              <AvatarImage
                                src={`https://avatar.vercel.sh/${project.uuid}`}
                              />
                            </Avatar>
                            {project.name}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormFooter>
              <Button type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                variant={"solid"}
                size={"md"}
              >
                {!isPending ? (
                  "Create"
                ) : (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating
                  </>
                )}
              </Button>
            </FormFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
