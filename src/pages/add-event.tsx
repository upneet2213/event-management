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

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddEvent } from "@/apis/use-add-event";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import { typeOptions } from "@/constants";
import { GetServerSideProps } from "next";

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

export default function AddEvent({ date }: { date: number }) {
  const router = useRouter();

  const queryClient = useQueryClient();
  const { mutate } = useAddEvent();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      eventFrom: date ? new Date(date) : undefined,
      eventTo: date ? new Date(date) : undefined,
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const payload = {
      ...data,
      eventFrom: data.eventFrom.valueOf(),
      eventTo: data.eventTo.valueOf(),
    };
    mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["events"],
        });
        router.back();
      },
    });
  };

  return (
    <main className="min-h-screen pt-12 p-24">
      <Form {...form}>
        <h1 className="text-4xl mb-12">Add Event</h1>
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
                  <FormLabel>Event Description</FormLabel>
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
  date: number;
}> = async (ctx) => {
  const date = parseInt(ctx.query.date as string);

  return {
    props: {
      date,
    },
  };
};
