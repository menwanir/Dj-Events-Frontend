import Layout from "@/components/Layout";
import { API_URL } from "@/config";
import Link from "next/link";
import EventItem from "@/components/EventItem";

export default function Home({events}) {
  console.log(events);
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.data.map((evt) => (
         
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href="/events" className="btn-secondary">
         View All Events
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?populate=*`);
  const events = await res.json();

  return {
    props: {events},
    revalidate: 1,
  };
}
