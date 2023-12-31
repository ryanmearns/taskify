"use client";

import { Project } from "@/db/types";
import { useDialogTranisition } from "@/utils/hooks/use-dialog-transition";
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
  Button,
  ButtonIcon,
  Dialog,
  DialogContent,
  DialogTrigger,
  Input,
  Textarea,
} from "@playbook/ui";
import { Loader2, Pen } from "lucide-react";
import * as React from "react";
import { toast } from "react-hot-toast";
import z from "zod";
import { updateProjectAction } from "../../_api/update-project";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
  description: z.string().optional(),
});

export const UpdateProjectForm = (props: { project: Project }) => {
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
      name: props.project.name ? props.project.name : "",
      description: props.project.description ? props.project.description : "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        await updateProjectAction({
          uuid: props.project.uuid,
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
        <Button>
          <ButtonIcon Icon={<Pen />} orientation={"leading"} />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormHeader>
              <FormTitle>Create a project</FormTitle>
            </FormHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormFooter>
              <Button type={"button"} onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant={"solid"} size={"md"}>
                {!isPending ? (
                  "Save"
                ) : (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving
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
