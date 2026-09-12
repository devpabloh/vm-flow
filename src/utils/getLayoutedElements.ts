import dagre from 'dagre';
import { type Node, type Edge } from '@xyflow/react';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

// Ajuste essas medidas de acordo com o tamanho real dos seus nós no CSS
const nodeWidth = 172;
const nodeHeight = 36;

export const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
  // 'TB' (Top-to-Bottom) = De cima para baixo. 'LR' (Left-to-Right) = Da esquerda para direita.
  dagreGraph.setGraph({ rankdir: direction });

  // 1. Dizemos ao Dagre quais são os nós e o tamanho deles
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  // 2. Dizemos ao Dagre como eles se conectam
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // 3. O Dagre faz a mágica da matemática aqui
  dagre.layout(dagreGraph);

  // 4. Pegamos os nós com as novas posições (x, y) calculadas
  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      position: {
        // O Dagre calcula o centro do nó, o React Flow usa o canto superior esquerdo,
        // por isso subtraímos metade da largura/altura
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2
      }
    };
    return newNode;
  });

  return { nodes: newNodes, edges };
};
