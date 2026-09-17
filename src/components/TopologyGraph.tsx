import { useCallback } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { CustomServiceNode } from './custom-service-node';
import { getLayoutedElements } from '../utils/getLayoutedElements';

const nodeTypes = { custom: CustomServiceNode };

const initialNodes: Node[] = [
  {
    id: 'vm-1',
    type: 'custom',
    position: { x: 500, y: 0 },
    data: {
      label: 'VM Principal',
      type: 'vm',
      description: 'Ubuntu 22.04 (Clique para expandir)',
    },
  },
  {
    id: 'vm-2',
    type: 'custom',
    position: { x: 0, y: 0 },
    data: {
      label: 'VM secundária',
      type: 'vm',
      description: 'Ubuntu 22.04 (Clique para expandir)',
    },
  },
];

export function TopologyGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

    const expandVM = useCallback(() => {
    const newNodes: Node[] = [
      ...initialNodes,
      {
        id: 'redis',
        type: 'custom',
        position: { x: 0, y: 0 },
        data: { label: 'Redis Cache', description: 'Porta 6379' },
      },
      {
        id: 'db',
        type: 'custom',
        position: { x: 0, y: 0 },
        data: { label: 'PostgreSQL', description: 'Porta 5432' },
      },
      {
        id: 'api',
        type: 'custom',
        position: { x: 0, y: 0 },
        data: { label: 'Node.js API', description: 'Express Backend' },
      },
    ];
    const newEdges: Edge[] = [
      // Conexões que saem da VM Principal
      { id: 'e-vm-redis', source: 'vm-1', target: 'redis', animated: true },
      { id: 'e-vm-db', source: 'vm-1', target: 'db', animated: true },
      { id: 'e-vm-api', source: 'vm-1', target: 'api', animated: true },
        {
        id: 'e-vm2-redis',
        source: 'vm-2',
        target: 'redis',
        animated: true,
        // Dica opcional: você pode estilizar ou colocar label para destacar a conexão entre VMs
        label: 'Acesso Remoto',
        style: { stroke: '#f59e0b' }, 
      },
    ];
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      newNodes,
      newEdges,
      'TB'
    );
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [setNodes, setEdges]);

  return (
    <div className="w-full h-[600px] border border-gray-200 rounded-lg bg-slate-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onNodeClick={(_, node) => {
          if (node.id === 'vm-1') {
            expandVM();
          }
        }}
        fitView
      />
    </div>
  );
}
