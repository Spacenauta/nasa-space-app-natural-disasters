import { CardCategory } from "./card-category"

export function CardsCategories() {
  return (
    <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
      <CardCategory description="Forest Fires" title="🔥 Wildfires" />
      <CardCategory description="Water Overflow" title="🌊 Floods" />
      <CardCategory description="Severe Weather" title="🌪️ Storms" />
      <CardCategory description="Eruptions" title="🌋 Volcanoes" />
      <CardCategory description="Seismic Activity" title="⚡ Earthquakes" />
      <CardCategory description="Water Scarcity" title="🌡️ Droughts" />
      <CardCategory description="Ground Movement" title="🏔️ Landslides" />
      <CardCategory description="Sea/Lake Ice" title="❄️ Ice" />
      <CardCategory description="Air Quality" title="🌫️ Dust" />
      <CardCategory description="Human-Made" title="⚠️ Other" />
    </div>
  )
}
