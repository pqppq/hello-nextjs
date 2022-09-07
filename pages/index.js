import Head from "next/head";
import EventList from "../components/events/event-list";
import NewsLetterRegisteration from "../components/input/newsletter-registration";
import { getFeaturedEvents } from "../helpers/api-util";

function Home(props) {
  return (
    <div>
      <Head>
        <title>Next.js Events</title> <title>Next.js Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <NewsLetterRegisteration />
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const events = await getFeaturedEvents();
  return {
    props: { events: events },
  };
}

export default Home;
