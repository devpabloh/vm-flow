export function DefaultInput (){
    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-medium text-brand-main">Nome da VM</label>
            <input
                type="text"
                placeholder="Ex: web-server-02"
                className="w-full px-3 py-2 text-xs bg-brand-input border border-brand-border and-border rounded-lg text-brand-main placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
        </div>
    )
}