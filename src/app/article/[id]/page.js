import Posts from "@/app/component/post";

async function getPost(id) {
    const res = await fetch(`http://127.0.0.1:8000/api/article/${id}/`);
    return res.json();
}

export default async function Home({params}) {
    const postData = getPost(params.id);
    const [posts] = await Promise.all([postData]);
    
    return (
    <main>
        {
            posts.data ?  <Posts post={posts} single={true}></Posts> : <h1 className="text-white text-2xl text-center mt-5">DATA TIDAK DITEMUKAN</h1> 
        }
       
    </main>
    );
}
