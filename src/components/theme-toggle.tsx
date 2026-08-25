import {useState, useEffect} from 'react'

export function ThemeToggle() {
    const [isDark, setIsDark] = useState(()=> {
            const savedTheme = localStorage.getItem("theme");

            if(savedTheme){
                return savedTheme === "dark";
            }

            return window.matchMedia("(prefers-color-scheme: dark)").matches;
    })

    useEffect(()=> {
        document.documentElement.classList.toggle("dark", isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }, [isDark])

    return (
        <button
            type="button"
            onClick = {()=> setIsDark((current) => !current)}
            arial-label="Alternar tema"
            title="Alternar tema"
            className="rounded-md p-2 text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
        >
            {isDark ? "☀" : "☾"}
        </button>
    )

}