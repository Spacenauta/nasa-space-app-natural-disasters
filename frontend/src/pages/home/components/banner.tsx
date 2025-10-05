import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import { Globe } from "@/components/ui/globe"

export function Banner() {
  return (
    <div>
      <div className="grid grid-cols-2">
        <Globe className="-mt-5 relative" />

        <div className="m-auto flex h-[360px] flex-col justify-between">
          <h2 className="font-bold text-5xl">
            Smart Prediction <br /> and Protection <br /> Against Disasters
          </h2>
          <p className="text-2xl text-gray-500">
            Global early warning system that transforms NASA EONET data into
            personalized safety using AI
          </p>

          <div className="flex items-center gap-5">
            <div className="text-center">
              <h1 className="font-bold text-3xl">10+</h1>
              <p className="text-gray-500 text-sm">Categories</p>
            </div>

            <div className="text-center">
              <h1 className="font-bold text-3xl">Real-Time</h1>
              <p className="text-gray-500 text-sm">Nasa Data</p>
            </div>

            <div className="text-center">
              <h1 className="font-bold text-3xl">AI</h1>
              <p className="text-gray-500 text-sm">Prediction</p>
            </div>

            <div className="text-center">
              <h1 className="font-bold text-3xl">Global</h1>
              <p className="text-gray-500 text-sm">Coverage</p>
            </div>
          </div>

          <div className="flex gap-5">
            <Button
              asChild
              className="cursor-pointer px-6 py-5"
              variant="outline"
            >
              <Link to="/sign-in">Start Free</Link>
            </Button>
            <Button className="cursor-pointer px-6 py-5" variant="destructive">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
