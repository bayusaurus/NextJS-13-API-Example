import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './component/layout/navbar'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Articles',
  description: 'Show All Articles',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className={inter.className}> */}
      <body className='bg-gray-900'>
        <Navbar></Navbar>
        {children}
      </body>
    </html>
  )
}
