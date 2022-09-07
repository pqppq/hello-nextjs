import { useRouter } from "next/router";

function BlogPostsPage() {
  const router = useRouter();

  // localhost:3000/blog/2022/12
  // router.query --> "slug": ["2022", "12"]
  const slugs = router.query.slug;

  return (
    <div>
      <h1>The Blog Posts</h1>
      <p>slugs: {slugs.join("/")}</p>
    </div>
  );
}

export default BlogPostsPage;
