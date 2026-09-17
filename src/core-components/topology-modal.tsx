import { useState, useCallback, useMemo, useEffect } from 'react';
import { ReactFlow, useNodesState, useEdgesState, type Node, type Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { X } from 'lucide-react';

import { CustomServiceNode } from '../components/custom-service-node';
import { getLayoutedElements } from '../utils/getLayoutedElements';
import type { VirtualMachine } from '../types/topology';

const nodeTypes = { custom: CustomServiceNode };

interface TopologyModalProps {
  vm: VirtualMachine;
  allVms: VirtualMachine[];
  onClose: () => void;
}

export function TopologyModal({ vm, allVms, onClose }: TopologyModalProps) {
  const [expandedNodeIds, setExpandedNodeIds] = useState<Set<string>>(new Set());

  const { visibleNodes, visibleEdges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const isVmExpanded = expandedNodeIds.has(vm.id);

    // 1. Nó da VM Principal sempre visível
    nodes.push({
      id: vm.id,
      type: 'custom',
      position: { x: 0, y: 0 },
      data: {
        label: vm.name,
        type: 'vm',
        description: `${vm.ip} • Clique para ${isVmExpanded ? 'fechar' : 'expandir'}`,
      },
    });

    // 2. Se a VM foi clicada (expandida), mostra os serviços dela
    if (isVmExpanded && vm.services) {
      vm.services.forEach((service) => {
        const isServiceExpanded = expandedNodeIds.has(service.id);
        const hasExternalConnections = Boolean(service.connectedVmIds && service.connectedVmIds.length > 0);

        nodes.push({
          id: service.id,
          type: 'custom',
          position: { x: 0, y: 0 },
          data: {
            label: service.name,
            description: `${service.description ?? ''} ${
              hasExternalConnections ? (isServiceExpanded ? '▲ Fechar conexão' : '▼ Ver conexões') : ''
            }`.trim(),
          },
        });

        edges.push({
          id: `e-${vm.id}-${service.id}`,
          source: vm.id,
          target: service.id,
          animated: true,
        });

        // 3. Se o serviço foi clicado e tem conexões externas com outras VMs
        if (isServiceExpanded && service.connectedVmIds) {
          service.connectedVmIds.forEach((targetVmId) => {
            const targetVm = allVms.find((v) => v.id === targetVmId);
            if (targetVm) {
              const isOtherVmExpanded = expandedNodeIds.has(targetVm.id);

              nodes.push({
                id: targetVm.id,
                type: 'custom',
                position: { x: 0, y: 0 },
                data: {
                  label: targetVm.name,
                  type: 'vm',
                  description: `${targetVm.ip} (Remota • Clique para ${isOtherVmExpanded ? 'fechar' : 'expandir'})`,
                },
              });

              edges.push({
                id: `e-${service.id}-${targetVm.id}`,
                source: targetVm.id,
                target: service.id,
                animated: true,
                label: 'Acesso Remoto',
                style: { stroke: '#f59e0b' },
              });

              // 4. Se a outra VM também foi clicada, abre os serviços exclusivos dela
              if (isOtherVmExpanded && targetVm.services) {
                targetVm.services.forEach((otherService) => {
                  if (otherService.id !== service.id) {
                    nodes.push({
                      id: otherService.id,
                      type: 'custom',
                      position: { x: 0, y: 0 },
                      data: {
                        label: otherService.name,
                        description: otherService.description ?? '',
                      },
                    });

                    edges.push({
                      id: `e-${targetVm.id}-${otherService.id}`,
                      source: targetVm.id,
                      target: otherService.id,
                      animated: true,
                    });
                  }
                });
              }
            }
          });
        }
      });
    }

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, 'TB');
    return { visibleNodes: layoutedNodes, visibleEdges: layoutedEdges };
  }, [vm, allVms, expandedNodeIds]);

  const [nodes, setNodes, onNodesChange] = useNodesState(visibleNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(visibleEdges);

  // Sincroniza o layout calculado com o estado do ReactFlow
  useEffect(() => {
    setNodes(visibleNodes);
    setEdges(visibleEdges);
  }, [visibleNodes, visibleEdges, setNodes, setEdges]);

  // Alterna expansão ao clicar em qualquer nó
  const handleNodeClick = useCallback((_: React.MouseEvent, clickedNode: Node) => {
    setExpandedNodeIds((prev) => {
      const next = new Set(prev);
      if (next.has(clickedNode.id)) {
        next.delete(clickedNode.id); // Fecha
      } else {
        next.add(clickedNode.id); // Abre
      }
      return next;
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="w-full max-w-5xl h-[85vh] bg-background-secondary rounded-2xl border border-border-default shadow-2xl flex flex-col overflow-hidden">
        {/* Topo do Modal */}
        <div className="p-4 sm:p-5 border-b border-border-default flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-text-primary">Topologia de Infraestrutura</h2>
            <p className="text-xs text-text-secondary">
              Máquina em foco: <strong className="text-text-primary">{vm.name}</strong> ({vm.ip}) • Clique nos nós para expandir ou recolher
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Canvas da Topologia */}
        <div className="flex-1 w-full h-full bg-slate-50 dark:bg-slate-900/50">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            onNodeClick={handleNodeClick}
            fitView
          />
        </div>
      </div>
    </div>
  );
}
