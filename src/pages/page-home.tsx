import { useIsAuthenticated } from "@azure/msal-react";
import {useRoles} from "../auth/use-roles";
import { ROLES } from "../auth/roles";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Text } from "../components/text";
import { Button } from "../components/button";
import {Plus, ChartColumnDecreasing} from 'lucide-react'
import { Card } from "../components/card";
import { Alert } from "../components/alert";

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
  },
  {
    id: 'alertas-inteligentes',
    titulo: "Alertas Inteligentes",
    conteudo: "Configure noticações personalizadas para anomalias na rede ou picos de processamento.",
    conteudoSecondy: "Seja avisado instataneamente no Slack ou e-mail quando uma VM precisar de atenção."
  }
]


export function PageHome() {
  const [noAccess, setNoAccess] = useState<'dashboard' | 'virtual-machine' | null>(null);
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const {hasRole} = useRoles();
  const isAdmin = hasRole(ROLES.admin);

  const TIME_ALERT_MESSAGE = 4000

  function handleAcessDashboard(){
    if(!isAuthenticated){
      navigate('/login');
      return;
    }

    if(isAdmin){
      navigate('/monitoring')
      return;
    }

    setNoAccess('dashboard');
  }

  function handleVirtualMachine(){
    if(!isAuthenticated){
      navigate('/login');
      return;
    }

    if(isAdmin){
      navigate('/virtual-machines')
      return;
    }

    setNoAccess('virtual-machine');
  }

  useEffect(()=>{
    if(!noAccess) return;
    const timer = setTimeout(()=> setNoAccess(null), TIME_ALERT_MESSAGE)

    return ()=> clearTimeout(timer)
  },[noAccess])

  return (
    <div className="flex flex-col gap-8 md:gap-16 p-8">
      <section className="flex flex-col gap-4">
        <Text as="h2" variant="h2">Visibilidade e controle da sua infraestrutura de forma visual</Text>
        <Text as="h3" variant="h3">Gerencie e monitore suas máquinas virtuais. Mapeie dependências, otimize recursos e tome decisões baseadas em dados com o nosso painel inteligente.</Text>
        <div className="flex gap-4">
          <Button 
            icon={ChartColumnDecreasing} 
            className="text-white"
            onClick={handleAcessDashboard}
          >
            Acessar Dashboard
          </Button>
          <Button
            icon={Plus}
            className="text-white"
            onClick={handleVirtualMachine}
          >
            Máquina Virtual
          </Button>
          {noAccess === 'dashboard' &&  (
            <Alert variant="error">Você não possui acesso ao dashboard.</Alert>
          )}
          {noAccess === 'virtual-machine' && (
            <Alert variant="error">Você não possui acesso à máquina virtual.</Alert>
          )}
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
