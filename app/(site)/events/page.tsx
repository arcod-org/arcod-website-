import type { Metadata } from "next";
import EventCard from "@/components/site/EventCard";
import { getPastEvents, getUpcomingEvents } from "@/lib/data";

export const revalidate = 300;
export const metadata: Metadata = { title: "Events", description: "Upcoming and past ARCOD events — trainings, camps, competitions and community programmes." };

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([getUpcomingEvents(30), getPastEvents(12)]);
  return (
    <>
      <section className="bg-night text-white">
        <div className="wrap pb-16 pt-24">
          <div className="eyebrow text-gold">Events</div>
          <h1 className="mt-5 max-w-[880px] text-[clamp(42px,6vw,80px)] font-extrabold leading-none">Join us on the ground.</h1>
          <p className="mt-6 max-w-[620px] text-lg leading-relaxed text-sage">Trainings, camps, competitions and community gatherings across Krishnagiri District.</p>
        </div>
      </section>
      <section className="wrap py-20">
        <h2 className="text-3xl font-extrabold text-forest">Upcoming</h2>
        {upcoming.length ? (
          <div className="mt-8 flex flex-wrap gap-4">{upcoming.map((e) => <EventCard key={e.id} e={e} />)}</div>
        ) : (
          <p className="mt-6 rounded-2xl border border-line bg-white p-8 text-body">No upcoming events are scheduled right now. Please check back soon, or <a href="/contact" className="font-semibold text-forest underline">contact us</a> to know more.</p>
        )}
        {past.length > 0 && (
          <>
            <h2 className="mt-20 text-3xl font-extrabold text-forest">Past events</h2>
            <div className="mt-8 flex flex-wrap gap-4 opacity-90">{past.map((e) => <EventCard key={e.id} e={e} />)}</div>
          </>
        )}
      </section>
    </>
  );
}
