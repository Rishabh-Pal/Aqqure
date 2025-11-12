import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import AqqruePromise from '@/components/AqqruePromise'
import TheProblem from '@/components/TheProblem'
import PageLoader from '@/components/PageLoader'

export default function Home() {
  return (
    <>
      <PageLoader />
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <AqqruePromise />
        <TheProblem />
      </main>
    </>
  )
}

