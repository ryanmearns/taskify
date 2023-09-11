"use client";

import * as todos from "@/actions/todos";
import { useDialogTranisition } from "@/utils/hooks/use-dialog-transition";
import {
  f,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  zodResolver,
} from "@playbook/forms";
import {
  Button,
  ButtonIcon,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from "@playbook/ui";
import { Loader2, Plus } from "lucide-react";
import * as React from "react";
import z from "zod";

const formSchema = z.object({
  todo: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
});

export const CreateTodoForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const { open, setOpen } = useDialogTranisition({
    isPending,
    onClose: () => form.reset(),
  });

  const form = f.useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todo: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      await todos.createTodo(values);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" block>
          <ButtonIcon Icon={<Plus />} orientation={"leading"} />
          Create todo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Create a todo</DialogTitle>
              <DialogDescription>Add a todo to your list</DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="todo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" size={"md"}>
                {!isPending ? (
                  "Create"
                ) : (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
