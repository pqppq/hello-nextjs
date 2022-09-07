import { useRouter } from "next/router";

function ClientProjectsPage() {
  const router = useRouter();

  function loadProjectHandler() {
    // load data...
    router.push({
      pathname: "/clients/[id]/[projectid]",
      query: {
        id: "Max",
        projectid: "projectA",
      },
    });
  }

  return (
    <div>
      <h1>This is client's projects page.</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
}

export default ClientProjectsPage;
