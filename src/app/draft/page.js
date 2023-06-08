'use client'
import Link from 'next/link';
import Posts from '../component/post';
import { useEffect, useState } from 'react';

export default function Home() {
  const [posts, setPosts] = useState(null);
  const [offset, setOffset] = useState(0);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
      setLoading(true);
      fetch(`http://127.0.0.1:8000/api/article/100/${offset}/draft/`)
      .then((res) => res.json())
      .then((data) => {
          setPosts(data);
          console.log(data)
          setLoading(false);
      });
  }, []);

  if (isLoading) return <h1 className="text-2xl text-center text-zinc-300 mt-5 bg-lime">Loading</h1>;
  if (!posts) return <h1 className="text-2xl text-center text-zinc-300 mt-5 bg-lime">No Data</h1>
  return (
    <main>

      <div className='flex justify-center'>
        <div className='mt-5 flex justify-between w-4/6'>
          <h1 className="text-2xl text-center text-zinc-300  bg-lime">Draft Article</h1>
          <Link href={'/article/create'}>
            <button 
                type="button"
                className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">
                Add Article
            </button>
          </Link>
        </div>
      </div>
      
      { posts.data.length > 0 ? <Posts post={posts}></Posts> : <h1 className="text-2xl text-center text-zinc-300 mt-2 bg-lime">No Article Found</h1> }

    </main>
  );
}
