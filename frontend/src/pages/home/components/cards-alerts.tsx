import { CardAlert } from "./card-alert"

export function CardsAlerts() {
  return (
    <div className="mt-5 grid grid-cols-2 px-6 lg:grid-cols-4">
      <CardAlert
        description="Receive instant notifications about natural disaster risks in your region"
        icon=""
        title="Real-Time Alerts"
      />

      <CardAlert
        description="Interactive chatbot with personalized checklists and protection guidance"
        icon=""
        title="Smart AI Agent"
      />

      <CardAlert
        description="Geo-referenced alerts for your continent, country and state"
        icon=""
        title="Personalized Location"
      />

      <CardAlert
        description="Prediction engine based on NASA data and machine learning"
        icon=""
        title="AI-Powered Prediction"
      />
    </div>
  )
}
