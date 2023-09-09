"use client";

import * as todos from "@/actions/todos";
import { useDialogTranisition } from "@/utils/hooks/use-dialog-transition";
import {
  f,
  Form,
  FormButton,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  zodResolver,
} from "@playbook/forms";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from "@playbook/ui";
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
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter message" {...field} />
                  </FormControl>
                  <FormDescription>This message will be sent</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <FormButton isPending={isPending} />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
