import Link from "next/link"
export default function Navbar() {
    return (
        <nav className="py-5 px-10 flex justify-between text-zinc-300 bg-gray-900">
            <ul className="flex flex-row align-middle h-full space-x-4">
                <Link href='/'>
                    <li className="flex flex-col align-middle h-full justify-center">
                        <div className="text-2xl font-semibold flex flex-col align-middle h-full justify-center">
                            Home
                        </div>
                    </li>
                </Link>
                <Link href='/'>
                    <li className="flex flex-col align-middle h-full justify-center">
                        <div className="text-xl font-semibold flex flex-col align-middle h-full justify-center">
                            Published
                        </div>
                    </li>
                </Link>
                <Link href='/draft'>
                    <li className="flex flex-col align-middle h-full justify-center">
                        <div className="text-xl font-semibold flex flex-col align-middle h-full justify-center">
                            Draft
                        </div>
                    </li>
                </Link>
                <Link href='/trash'>
                    <li className="flex flex-col align-middle h-full justify-center">
                        <div className="text-xl font-semibold flex flex-col align-middle h-full justify-center">
                            Trash
                        </div>
                    </li>
                </Link>
            </ul>
        </nav>
    )
}