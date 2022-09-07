import { useRef, useState } from "react";
import axios from "axios";

function Home() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const email = emailInputRef.current.value;
    const feedbackText = feedbackInputRef.current.value;

    axios
      .post("/api/feedback", {
        email: email,
        text: feedbackText,
        headers: {
          "Continent-Type": "application/json",
        },
      })
      .then((response) => console.log(response.data));
  }

  function loadedFeedbackHandler(id) {
    axios
      .get(`/api/feedback/${id}`)
      .then((response) => setFeedbackItems(response.data.feedback));
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" rows="5" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button onClick={submitFormHandler}>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadedFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
