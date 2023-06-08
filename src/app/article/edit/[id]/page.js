'use client'
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


export default  function Home({params}) {
    const [posts, setPosts] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const { push } = useRouter();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = document.querySelector('#title').value;
        const category = document.querySelector('#category').value;
        const content = document.querySelector('#content').value;
        const submitButton = e.nativeEvent.submitter;
        const status = submitButton.id;

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/article/${params.id}/`, {
                method: 'PUT',
                body: JSON.stringify({
                    'title': title,
                    'category': category,
                    'status': status,
                    'content': content,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            Swal.fire(
                'Updated!',
                'Your file has been Updated.',
                'success'
            );
            push('/')
        } catch (error) {
            Swal.fire(
                'Failed!',
                'Update Data Failed.',
                'failed'
            );
        }
    };

    useEffect(() => {
        setLoading(true);
        fetch(`http://127.0.0.1:8000/api/article/${params.id}/`)
        .then((res) => res.json())
        .then((data) => {
            setPosts(data);
            setLoading(false);
        });
    }, []);
    
    if (isLoading) return <p>Loading...</p>;
    if (!posts) return <p>No profile data</p>;

    return (
    <main>
        <h1 className="text-white text-2xl text-center mt-5 mb-2">EDIT DATA</h1>
        {
            posts.data ?  
            <div className="flex flex-row justify-center">
                <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                {/* <form className="w-full max-w-lg"> */}
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-zinc-300 text-xs font-bold mb-2"
                                htmlFor="title"
                            >
                                Title
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="title"
                                type="text"
                                name="title"
                                defaultValue={posts.data.title}
                                minLength={20}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-zinc-300 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Category
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="category"
                                type="text"
                                name="category"
                                defaultValue={posts.data.category}
                                minLength={3}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-zinc-300 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Content
                            </label>
                            <textarea
                                className=" no-resize appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                                id="content"
                                name="content"
                                defaultValue={posts.data.content}
                                required
                                minLength={200}
                            />
                        </div>
                    </div>
                    <div className="md:flex md:items-center">
                        <div className="w-full flex space-x-2">
                            <button
                                className="focus:outline-none text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                                type="submit"
                                id="Draft"
                                value='Draft'
                            >
                                Draft
                            </button>
                            <button
                                className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                                type="submit"
                                id="Publish"
                                value='Publish'
                            >
                                Publish
                            </button>
                        </div>
                    <div className="md:w-2/3" />
                    </div>
                </form>
            </div> 
            : 
            <h1 className="text-white text-2xl text-center mt-5">DATA TIDAK DITEMUKAN</h1> 
        }
       
    </main>
    );
}
