import { AlertOctagon } from "lucide-react"

export default function NotFound() {
  return (
    <main className="h-full grid gap-4 place-items-center">
      <AlertOctagon size={64} />
      <h2>Not found</h2>
    </main>
  )
}