import { Fragment } from "react";
import Head from "next/head";
import { getAllEvents, getEventById } from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlart from "../../components/ui/error-alert";
import Comments from "../../components/input/comments";

function Event(props) {
  const event = props.event;

  console.log(event);
  if (!event) {
    return (
      <ErrorAlart>
        <p>No event found!</p>
      </ErrorAlart>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
}

export default Event;

export async function getStaticProps(context) {
  const eventId = context.params.id;
  const event = await getEventById(eventId);
  return {
    props: { event: event },
    revalidate: 1800,
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();
  const paths = events.map((e) => `/events/${e.id}`);
  return {
    paths: paths,
    fallback: false,
  };
}
