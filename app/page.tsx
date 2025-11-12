import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import AqqruePromise from '@/components/AqqruePromise'
import TheProblem from '@/components/TheProblem'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <AqqruePromise />
      <TheProblem />
    </main>
  )
}

