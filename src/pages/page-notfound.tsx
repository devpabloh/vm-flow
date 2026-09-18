import { Text } from "../components/text";
import { Button } from "../components/button";
import { Link } from "react-router";
import virtualMachine from "../assets/virtual-machine.png";
import { ArrowLeft } from "lucide-react";

export function PageNotfound() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center min-h-screen w-full p-8 gap-8 max-w-6xl mx-auto">
      <div className="flex flex-col items-start gap-4 max-w-md">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-9xl font-bold text-red-500">404</h1>
          <Text as="h2" variant="h2">Página não encontrada</Text>
        </div>

        <Text as="p" variant="caption">
          A página que você está procurando pode ter sido removida, o endereço está incorreto ou não existe no nosso sistema de gerenciamento de VMs.
        </Text>

        <div className="flex items-center justify-between gap-4">
          <Link to="/">
            <Button icon={ArrowLeft}>Voltar para o Início</Button>
          </Link>
          <Link to="/virtual-machines" className="text-action-primary border-none bg-transparent">
            Voltar para o Login
          </Link>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <img
          src={virtualMachine}
          alt="Imagem de uma máquina virtual"
          className="h-64 md:h-80 object-contain"
        />
      </div>
    </section>
  );
}
