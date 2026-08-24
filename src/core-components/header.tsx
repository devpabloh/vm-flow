import Container from "../components/container";
import Logo from "../assets/react.svg?react"

export function Header(){
    return (
        <Container as="header" className="h-16 shrink-0">
            <Logo className="h-9 md:h-12"/>
        </Container>
    )
}