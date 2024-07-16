import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  DatePicker,
} from "@/components";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  dehydrate,
  DehydratedState,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import { getEventById, useGetEventById } from "@/apis/use-get-event-by-id";
import { useSearchParams } from "next/navigation";
import { GetServerSideProps } from "next";
import { useEditEvent } from "@/apis/use-edit-event";
import { useRouter } from "next/router";
import { typeOptions } from "@/constants";

const FormSchema = z
  .object({
    eventName: z
      .string({
        required_error: "Please add a name",
      })
      .min(1),
    eventDescription: z.string().nullable(),
    eventType: z.string({
      required_error: "Please add an event type",
    }),
    eventFrom: z.date({
      required_error: "Please select a starting date",
    }),
    eventTo: z.date({
      required_error: "Please select an end date",
    }),
  })
  .refine((data) => data.eventFrom <= data.eventTo, {
    message: "End date cannot be before start date",
    path: ["eventTo"], // The path to the field that should show the error
  });

export default function EditEvent() {
  const queryClient = useQueryClient();
  const { mutate } = useEditEvent();
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");
  const { data: event, isLoading } = useGetEventById(id ?? undefined);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...event,
      eventFrom: new Date(event?.eventFrom!),
      eventTo: new Date(event?.eventTo!),
    },
  });

  useEffect(() => {
    if (!isLoading) {
      form.reset({
        ...event,
        eventFrom: new Date(event?.eventFrom!),
        eventTo: new Date(event?.eventTo!),
      });
    }
  }, [form.reset, isLoading]);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    mutate(
      {
        ...data,
        id: event?.id!,
        eventFrom: data?.eventFrom.valueOf(),
        eventTo: data?.eventTo.valueOf(),
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            predicate(query) {
              return (
                query.queryKey[0] === "events" || query.queryKey[0] === "event"
              );
            },
          });
          router.back();
        },
      }
    );
  };

  return (
    <main className="min-h-screen pt-12 p-24">
      <Form {...form}>
        <h1 className="text-4xl mb-12">Edit Event</h1>
        <form
          className={`flex flex-col items-center gap-12`}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="eventName"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Event Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="eventDescription"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Event Description"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="eventType"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Event Type</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <FormControl>
                      <SelectTrigger className="pr-1.5">
                        <SelectValue placeholder="Select Event Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position="popper">
                      {typeOptions.map((option, id: number) => (
                        <SelectItem
                          key={`${option.value}-${id}`}
                          value={option.value?.toString() ?? ""}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="eventFrom"
            render={({ field }) => {
              return (
                <FormItem className="w-full flex flex-col">
                  <FormLabel>Event From</FormLabel>
                  <FormControl>
                    <DatePicker
                      date={field.value}
                      onChangeDate={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>Start Date of your event</FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="eventTo"
            render={({ field }) => {
              return (
                <FormItem className="w-full flex flex-col">
                  <FormLabel>Event To</FormLabel>
                  <FormControl>
                    <DatePicker
                      date={field.value}
                      onChangeDate={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>End Date of your event</FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<{
  dehydratedState: DehydratedState;
}> = async (ctx) => {
  const id = ctx.query.id as string;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["event", id],
    queryFn: () => getEventById(id),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
