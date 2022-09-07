function UserProfilePage(props) {
  return (
    <div>
      <h1>{props.username}</h1>
      <p>{props.timestamp}</p>
    </div>
  );
}

export default UserProfilePage;

// this only executes on the server after deployment
export async function getServerSideProps(context) {
  const { params, req, res } = context;
  console.log(new Date(Date.now()).toLocaleTimeString());

  return {
    props: {
      username: "Max",
      timestamp: new Date(Date.now()).toLocaleTimeString(),
    },
  };
}
