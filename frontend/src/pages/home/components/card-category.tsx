type CardCategoryProps = {
  title: string
  description: string
}

export function CardCategory({ title, description }: CardCategoryProps) {
  return (
    <div className="flex flex-col rounded-lg border px-4 py-2">
      <h2 className="font-bold">{title}</h2>
      <p className="text-xs">{description}</p>
    </div>
  )
}
