import {
  Input,
  Label,
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

import { Event } from "@/types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  eventName: z
    .string({
      required_error: "Please add a name",
    })
    .min(1),
  eventType: z.string({
    required_error: "Please add an event type",
  }),
  eventFrom: z.date({
    required_error: "Please select a starting date",
  }),
  eventTo: z.date({
    required_error: "Please select an end date",
  }),
});

export default function AddEvent() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      eventName: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    // console.log(data);
  };

  const typeOptions = [
    {
      value: "1",
      label: "Personal",
    },
    {
      value: "2",
      label: "Professional",
    },
    {
      value: "3",
      label: "Miscellanous",
    },
  ];

  return (
    <main className="min-h-screen p-24">
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
                  {/* <FormDescription>This is your event name</FormDescription> */}
                  {/* <FormMessage /> */}
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
                      <SelectTrigger className="pr-1.5 focus:ring-0">
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
                  {/* <FormDescription>This is your event name</FormDescription> */}
                  {/* <FormMessage /> */}
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
