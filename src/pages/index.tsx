import Image from "next/image";
import { Inter } from "next/font/google";
import { Calendar, Sheet } from "@/components";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { DaySheet } from "@/components/day-sheet";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const params = useSearchParams();
  const router = useRouter();

  const date = params.get("date");

  const event1Date = new Date(2024, 6, 12); // July 12, 2024
  const event2Date = new Date(2024, 6, 13); // July 13, 2024
  const event3Date = new Date(2024, 6, 14); // July 14, 2024
  const event4Date = new Date(2024, 6, 15); // July 15, 2024

  const events = [
    {
      id: "1",
      eventName: "Event1",
      eventType: "1",
      eventFrom: event1Date,
      eventTo: event2Date,
    },
    {
      id: "2",
      eventName: "Event2",
      eventType: "2",
      eventFrom: event2Date,
      eventTo: event2Date,
    },
    {
      id: "3",
      eventName: "Event3",
      eventType: "3",
      eventFrom: event2Date,
      eventTo: event4Date,
    },
  ];

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Calendar
        events={events}
        onDayClick={(props) => {
          router.push(`?date=${props.valueOf()}`);
        }}
      />
      <DaySheet
        open={Boolean(date)}
        setOpen={(isOpen) => {
          if (!isOpen) {
            router.replace("/");
          }
        }}
      />
    </main>
  );
}

// export async function getServerSideProps() {
//   // Fetch data from external API
//   // const res = await fetch(`https://.../data`)
//   // const data = await res.json()

//   // Pass data to the page via props
//   return { props: {} };
// }
