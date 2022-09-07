import { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import EventList from "../../components/events/event-list";
import ResultTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredEvent(props) {
  // const year = props.year;
  // const month = props.month;
  // const events = props.events;
  // const hasError = props.hasError;

  const [loadedEvents, setLoadedEvents] = useState([]);
  const router = useRouter();
  const filterData = router.query.slug;

  const year = +filterData[0];
  const month = +filterData[1];

  const base =
    "https://react-getting-started-4000c-default-rtdb.firebaseio.com";

  const { data, err } = useSWR(base + "/events.json", (url) =>
    axios.get(url).then((res) => res.data)
  );

  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({ id: key, ...data[key] });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  const pageHeadData = (
    <Head>
      <title>Filterd Events</title>
      <meta name="description" content={"A list of filterd events."} />
    </Head>
  );

  if (!loadedEvents) {
    return (
      <Fragment>
        {pageHeadData}
        <p className="center">Loading...</p>
      </Fragment>
    );
  }

  if (
    isNaN(year) ||
    year > 2030 ||
    year < 2021 ||
    isNaN(month) ||
    month < 1 ||
    month > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filterdEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  if (!filterdEvents || filterdEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(year, month - 1);

  return (
    <Fragment>
      {pageHeadData}
      <ResultTitle date={date} />
      <EventList items={filterdEvents} />
    </Fragment>
  );
}

export default FilteredEvent;

// export async function getServerSideProps(context) {
//   const slug = context.params.slug;
//   const year = +slug[0];
//   const month = +slug[1];
//   const events = await getFilteredEvents({ year: year, month: month });

//   if (
//     isNaN(year) ||
//     year > 2030 ||
//     year < 2021 ||
//     isNaN(month) ||
//     month < 1 ||
//     month > 12
//   ) {
//     return {
//       props: {
//         hasError: true,
//       },
//     };
//   }

//   return {
//     props: {
//       year: year,
//       month: month,
//       events: events,
//     },
//   };
// }
