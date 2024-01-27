import { Button } from "@/components/ui/button";

export function Trends() {
  return (
    <aside className="sticky top-0 p-2 h-max hidden xl:flex flex-col gap-4">
      <div className="bg-[rgb(32,_35,_39)] p-3 rounded-full flex items-center gap-3 text-[rgb(113,_118,_123)] focus:outline focus:outline-offset-2 focus:outline-1 focus:outline-red-600">
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" width={18} height={18}>
          <g>
            <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z">
            </path>
          </g>
        </svg>
        <input className="bg-transparent" placeholder="Buscar" />
      </div>

      <div className="bg-[rgb(22,_24,_28)] p-3 rounded-2xl gap-3 text-[rgb(231,_233,_234)] max-w-80 flex flex-col items-start">
        <h3 className="font-extrabold text-xl">Assine o Premium</h3>
        <p className="text-sm">Assine para desbloquear novos recursos e, se elegível, receba uma parte da receita dos anúncios.</p>
        
        <Button>Inscreva-se</Button>
      </div>
    </aside>
  )
}