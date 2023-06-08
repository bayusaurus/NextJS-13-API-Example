import Link from 'next/link'
import DateHumanizerFormat from '@/utils/helpers';

export default function Posts({post, single}) {
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
                        <div key={p.id} className="rounded-lg bg-zinc-200 text-gray-900 p-5">
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
