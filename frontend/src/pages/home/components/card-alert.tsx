import { Card, CardDescription, CardTitle } from "@/components/ui/card"

type CardAlertProps = {
  icon: string
  title: string
  description: string
}

export function CardAlert({ icon, title, description }: CardAlertProps) {
  return (
    <Card className="flex w-[280px] flex-col border-2 border-emerald-700/40 p-5 dark:bg-black/60">
      <CardTitle>{icon}</CardTitle>
      <CardDescription className="flex flex-col gap-3">
        <h2 className="font-semibold text-xl">{title}</h2>
        <p className="text-gray-500 text-sm">{description}</p>
      </CardDescription>
    </Card>
  )
}
