import Posts from "./component/post";

async function getPost() {
  const res = await fetch(`http://127.0.0.1:8000/api/article/100/0/published/`, {
    mode: "no-cors",
  });
  return res.json();
}

export default async function Home() {
  const postData = getPost();

  // Wait for the promises to resolve
  const [posts] = await Promise.all([postData]);

  return (
    <main>
      <h1 className="text-2xl text-center text-zinc-300 mt-5 bg-lime">Published Article</h1>
      <Posts post={posts}></Posts>
    </main>
  );
}
