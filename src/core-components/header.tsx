import Logo from "../assets/computer-connection.svg?react";
import { NavLink } from "react-router";
import { ThemeToggle } from "../components/theme-toggle";

const links = [
    {
        label: "Hub",
        to: "/"
    },
     {
        label: "Hub2",
        to: "/hub"
    },
]

export function Header(){
    return (
        <header className="flex h-16 shrink-0 items-center justify-around border-b border-border-default bg-background-secondary">
            <NavLink to="/" className="flex items-center gap-1 text-xl font-bold text-action-primary">
                <Logo className=" h-16"/>
                VM Flow
            </NavLink>
            <nav className="flex gap-4 items-center">
                {links.map((link)=> (
                    <NavLink to={link.to} className={({isActive})=> isActive ? "text-action-primary" : "text-text-secondary"}>
                        {link.label}
                    </NavLink>
                ))}
                <ThemeToggle/>
            </nav>
        </header>
    )
}