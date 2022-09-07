import MeetupList from "../components/meetups/MeetupList";
import { useState, useEffect } from "react";
import axios from "axios";

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState(false);
  const base =
    "https://react-getting-started-4000c-default-rtdb.firebaseio.com/";

  // https://ja.reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(base + "meetups.json")
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        const meetups = [];
        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key],
          };
          meetups.push(meetup);
        }
        setIsLoading(false);
        setLoadedMeetups(meetups);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList meetups={loadedMeetups} />
    </section>
  );
}

export default AllMeetupsPage;
