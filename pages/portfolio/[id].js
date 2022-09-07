import { useRouter } from "next/router";

function PortfolioProjectPage() {
  const router = useRouter();
  const projectId = router.query.id;

  return (
    <div>
      <h1>This is portfolio project page.</h1>
      <p>Project number: {projectId}</p>
    </div>
  );
}

export default PortfolioProjectPage;
