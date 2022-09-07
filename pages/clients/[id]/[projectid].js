import { useRouter } from "next/router";

function ClientProjectPage() {
  const router = useRouter();
  const projectId = router.query.projectid;

  return (
    <div>
      <h1>This is client's project page.</h1>
      <p>Project ID: {projectId}</p>
    </div>
  );
}

export default ClientProjectPage;
