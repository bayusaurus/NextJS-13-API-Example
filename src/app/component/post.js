"use client"
import Link from 'next/link'
import DateHumanizerFormat from '@/utils/helpers';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';


export default function Posts({post, single}) {
    const { push, refresh } = useRouter();
    const handleDelete = async (id, title) => {
        Swal.fire({
            title: 'Delete',
            text: `Are you sure want to delete ${title}?`,
            icon: 'question',
            confirmButtonText: 'Yes',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                deleteData(id);
            }
        });
    };

    async function deleteData(id) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/article/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({'status': 'Trash'}),
            });
            if (response.ok) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );
                push('/trash');
            } else {
                Swal.fire(
                    'Error!',
                    'Delete data failed',
                    'warning'
                )
            }
        } catch (error) {
            Swal.fire(
                'Error!',
                'Delete data failed',
                'warning'
            )
        }
    }
return (
        <section className="flex justify-center my-10">
            <div className="w-4/6 flex flex-col space-y-10">
            {
                single ?    
                    <div className="rounded-lg bg-zinc-200 text-gray-900 p-5">
                        <h1 className="text-2xl font-semibold mb-2 text-center">
                            {post.data.title}  
                        </h1>
                        <div className="flex flex-row space-x-4 justify-center mb-2">
                            <span className="text-sm">{post.data.category}</span>
                            <span className="text-sm">{post.data.status}</span>
                            <span className="text-sm">{DateHumanizerFormat(post.data.created_date)}</span>
                        </div>
                        <div className="whitespace-pre-wrap">
                            {post.data.content}
                        </div>
                    </div>
                    :
                    post.data.map((p) => (
                        <div key={p.id} className="rounded-lg bg-zinc-200 text-gray-900 p-5 w-full">
                            <div className='w-full my-2 flex flex-row justify-end space-x-2'>
                            <Link href={`article/edit/${p.id}/`}>
                                <button 
                                    type="button" 
                                    className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">
                                    Edit
                                </button>
                            </Link>
                            <button 
                                type="button"
                                onClick={() => handleDelete(p.id, p.title)}
                                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">
                                Delete
                            </button>
                            </div>
                            <Link href={`article/${p.id}/`}>
                                <h1 className="text-2xl font-semibold mb-2 text-center">
                                    {p.title}  
                                </h1>
                            </Link>
                            <div className="flex flex-row space-x-4 justify-center mb-2">
                                <span className="text-sm border-r-2">{p.category}</span>
                                <span className="text-sm border-r-2">{p.status}</span>
                                <span className="text-sm border-r-2">{DateHumanizerFormat(p.created_date)}</span>
                            </div>
                            <div className="whitespace-pre-wrap"> 
                                {p.content.substring(0, 300)+'...'}
                            </div>
                        </div>
                    ))
            }
            </div>
        </section>
    );
}
