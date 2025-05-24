import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

export default function Layout({ children }) {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>Recipe Finder</title>
        <meta name="description" content="Discover delicious recipes" />
      </Head>
      <header className="bg-orange-500 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/dashboard">
            <h1 className="text-2xl font-bold cursor-pointer">RecipeFinder</h1>
          </Link>
          {user && (
            <div className="flex items-center space-x-4">
              <span>Welcome, {user.name}</span>
              <button 
                onClick={handleLogout}
                className="bg-white text-orange-500 px-4 py-2 rounded hover:bg-orange-100 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
      <main className="container mx-auto p-4">{children}</main>
    </>
  )
}