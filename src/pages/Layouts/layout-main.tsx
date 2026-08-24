import { Outlet } from "react-router";
import { MainContent } from "../../core-components/main-content";
import { Header } from "../../core-components/header";
import { Footer } from "../../core-components/footer";

export function LayoutMain(){
    return (
        <div className="flex min-h-dvh flex-col">
            <Header/>
            <MainContent>
                <Outlet/>
            </MainContent>
            <Footer/>
        </div>
    )
}