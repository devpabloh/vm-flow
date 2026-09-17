export type ServiceType = 'redis' | 'database' | 'api' | 'custom';
export type VmStatus = 'running' | 'stopped' | 'error' | 'maintenance';

export interface ServiceItem {
  id: string;
  name: string;
  type: ServiceType;
  description?: string;
  connectedVmIds?: string[];
  isExpanded?: boolean;
}

export interface VirtualMachine {
  id: string;
  name: string;
  ip: string;
  status: VmStatus;
  cpu: number;
  memory: number;
  disk: number;
  services?: ServiceItem[];
}

export const mockVMs: VirtualMachine[] = [
  {
    id: '1',
    name: 'web-server-01',
    ip: '10.0.1.10',
    status: 'running',
    cpu: 12,
    memory: 32,
    disk: 45,
    services: [
      {
        id: 'srv-redis-1',
        name: 'Redis Cache',
        type: 'redis',
        description: 'Porta 6379',
        connectedVmIds: ['2']
      },
      {
        id: 'srv-db-1',
        name: 'PostgreSQL',
        type: 'database',
        description: 'Porta 5432'
      },
      {
        id: 'srv-api-1',
        name: 'Node.js API',
        type: 'api',
        description: 'Express Backend'
      }
    ]
  },
  {
    id: '2',
    name: 'api-gateway',
    ip: '10.0.1.11',
    status: 'running',
    cpu: 28,
    memory: 56,
    disk: 62,
    services: [
      {
        id: 'srv-gw-1',
        name: 'Kong Gateway',
        type: 'api',
        description: 'Porta 8080'
      },
      {
        id: 'srv-auth-1',
        name: 'Auth Service',
        type: 'api',
        description: 'JWT Auth'
      }
    ]
  },
  {
    id: '3',
    name: 'db-server-01',
    ip: '10.0.1.12',
    status: 'running',
    cpu: 41,
    memory: 78,
    disk: 71
  },
  {
    id: '4',
    name: 'cache-redis',
    ip: '10.0.1.13',
    status: 'running',
    cpu: 8,
    memory: 24,
    disk: 33
  },
  { id: '5', name: 'storage-01', ip: '10.0.1.14', status: 'stopped', cpu: 0, memory: 0, disk: 12 },
  {
    id: '6',
    name: 'backup-server',
    ip: '10.0.1.15',
    status: 'running',
    cpu: 19,
    memory: 43,
    disk: 50
  },
  { id: '7', name: 'frontend', ip: '10.0.1.16', status: 'running', cpu: 16, memory: 37, disk: 41 },
  { id: '8', name: 'worker-01', ip: '10.0.1.17', status: 'running', cpu: 7, memory: 21, disk: 28 }
];
