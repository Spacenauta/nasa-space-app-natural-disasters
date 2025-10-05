import { Header } from "@/components/header"

import { Banner } from "./components/banner"
import { CardsAlerts } from "./components/cards-alerts"
import { CardsCategories } from "./components/cards-categories"

export function Home() {
  return (
    <div>
      <Header />
      <Banner />

      <div className="flex flex-col p-6 dark:bg-black/30">
        <div className="mt-14 mb-8 flex flex-col items-center justify-center">
          <h1 className="mb-4 text-5xl">How It Works</h1>
          <p className="text-gray-500 text-xl">
            We monitor extreme weather events in real-time through NASA's EONET
            API
          </p>
        </div>

        <div className="m-auto mb-5 flex w-[80%] flex-col items-center rounded-lg border-2 border-emerald-700/40 p-8 dark:bg-black/60">
          <h2 className="font-bold text-xl">Monitored Disaster Categories</h2>
          <CardsCategories />
        </div>

        <CardsAlerts />
      </div>

      <footer className="my-10 text-center font-semibold text-lg">
        © 2025 Natural Disasters. Built for NASA Space Apps Challenge 2025
      </footer>
    </div>
  )
}
