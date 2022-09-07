import NewMeetupForm from "../components/meetups/NewMeetupForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewMeetupPage() {
  const navigate = useNavigate();

  function addMeetupHandler(meetupData) {
    const base =
      "https://react-getting-started-4000c-default-rtdb.firebaseio.com/";
    axios
      .post(base + "/meetups.json", meetupData)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        console.log("post failed");
      });
  }

  return (
    <section>
      <h1>Add New Meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default NewMeetupPage;
