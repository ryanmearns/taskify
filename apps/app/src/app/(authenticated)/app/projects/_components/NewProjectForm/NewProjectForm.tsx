"use client";

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
  Calendar,
  cn,
  Dialog,
  DialogContent,
  DialogTrigger,
  IconButton,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@playbook/ui";
import { format } from "date-fns";
import { CalendarIcon, FolderPlus, Loader2, Plus } from "lucide-react";
import * as React from "react";
import { toast } from "react-hot-toast";
import z from "zod";
import { addProjectAction } from "../../_api/add-project";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
  description: z.string().optional(),
  dueDate: z.date().optional(),
});

export const NewProjectForm = () => {
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
      name: "",
      description: "",
      dueDate: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        await addProjectAction({
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
        <IconButton variant={"ghost"} icon={<FolderPlus />} size={"xs"} />
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
            <FormFooter>
              <Button type={"button"} onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant={"solid"} size={"md"}>
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
