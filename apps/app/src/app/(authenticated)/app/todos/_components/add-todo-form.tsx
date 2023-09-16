"use client";

import {
  f,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormFooter,
  FormHeader,
  FormItem,
  FormMessage,
  FormTitle,
  zodResolver,
} from "@playbook/forms";
import { Button, Input } from "@playbook/ui";
import { Loader2 } from "lucide-react";
import * as React from "react";
import { toast } from "react-hot-toast";
import z from "zod";
import { addTodoAction } from "../_api/add-todo";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  content: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
});

export const AddTodoForm = () => {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  const form = f.useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        await addTodoAction(values);
        router.back();
      } catch (error) {
        toast.error("There was an error");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormHeader>
          <FormTitle>Create a todo</FormTitle>
          <FormDescription>Add a todo to your list</FormDescription>
        </FormHeader>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormFooter>
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
        </FormFooter>
      </form>
    </Form>
  );
};
