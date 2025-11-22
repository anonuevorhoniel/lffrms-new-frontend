import Header from "@/components/header"
import Hero from "@/components/hero"
import Services from "@/components/services"
import About from "@/components/about"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <Header />
      <Hero />
      <Services />
      <About />
      <Footer />
    </main>
  )
}
