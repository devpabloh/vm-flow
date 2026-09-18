import { Text } from "../components/text";
import { Button } from "../components/button";
import {Plus} from 'lucide-react'
import { Card } from "../components/card";

const recursosPrincipais = [
  {
    id: 'map-deps',
    titulo: "Mapeamento inteligente de dependências",
    conteudo: "Veja além da máquina, visualize instantaneamente tudo o que está conectado a cada VM:",
    conteudoSecondy: "Banco de dados, cluters Redis, Serviços de mensageria, integrações com APIs externas"
  },
  {
    id: 'gestao-prov', 
    titulo: "Gestão e Provisionamento Ágil",
    conteudo: "Adicione novas Máquinas Virtuais e configure seus nós de forma rápida e intuitiva.",
    conteudoSecondy: "Tenha o controle do ciclo de vida completo da sua infraestrutura a poucos cliques de distância."
  },
  {
    id: 'monitoramento',
    titulo: "Monitoramento de Saúde em Tempo Real",
    conteudo: "Acompanhe métricas vitais como uso de CPU, consumo de memória e I/O de disco.",
    conteudoSecondy: "Identifique gargalos antes que eles impactem a disponibilidade dos seus serviços."
  }
]


export function PageHome() {
  return (
    <div className="flex flex-col gap-8 md:gap-16 p-8">
      <section className="flex flex-col gap-4">
        <Text as="h2" variant="h2">Visibilidade e controle da sua infraestrutura de forma visual</Text>
        <Text as="h3" variant="h3">Gerencie e monitore suas máquinas virtuais. Mapeie dependências, otimize recursos e tome decisões baseadas em dados com o nosso painel inteligente.</Text>
        <div className="flex gap-4">
          <Button>Acessar Dashboard</Button>
          <Button icon={Plus}>Máquina Virtual</Button>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recursosPrincipais.map((recurso)=> (
          <Card key={recurso.id} className="flex flex-col gap-2">
            <Text as="h3" variant="h3" >{recurso.titulo}</Text>
            <Text>{recurso.conteudo}</Text>
            {recurso.conteudoSecondy && <Text>{recurso.conteudoSecondy}</Text>}
          </Card>
        ))}
      </section>
    </div>
  );
}
