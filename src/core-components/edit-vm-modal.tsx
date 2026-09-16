import { Text } from '../components/text';
import type {VirtualMachine} from '../core-components/vm-table'
import {useState} from 'react'

interface EditVmModalProps {
    vm: VirtualMachine | null;
    onClose: ()=> void;
    onSave: (vm: VirtualMachine)=> void;
}


export function EditVmModal({vm,onClose,onSave}: EditVmModalProps){
    const isEditing = Boolean(vm);

    const [name, setName] = useState(vm?.name ?? '');
    const [cpu, setCpu] = useState(vm?.cpu ?? 0);
    const [memory, setMemory] = useState(vm?.memory ?? 0);
    const [disk, setDisk] = useState(vm?.disk ?? 0);

    function handleSubmit(e: React.SubmitEvent){
        e.preventDefault();

        const vmData: VirtualMachine = {
            id: vm?.id ?? crypto.randomUUID(),
            ip: vm?.ip || '10.0.1.0',
            status: vm?.status ?? 'running',
            name,
            cpu,
            memory,
            disk
        }

        onSave(vmData);
    }


    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
            <div className='w-full max-w-md bg-background-secondary p-4 rounded-xl border border-border-default shadow-xl'>
                <Text as='h2' variant='h2'>{isEditing ? 'Editar Máquina virtual': 'Nova Máquina Virtual'}</Text>
                <Text as='span' variant='caption'>{isEditing? vm?.name : 'Preencha as informações para cadastrar'}</Text>
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col gap-4'
                >
                        <div>
                            <label 
                                className='text-xs font-semibold text-text-secondary '
                            >
                                Nome
                            </label>
                            <input
                                type='text'
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                                className='w-full mt-1 p-2 rounded border border-border-default bg-background-primary text-text-primary focus:ring-2 focus:ring-action-primary'
                            />
                        </div>
                        <div>
                            <label 
                                className='text-xs font-semibold text-text-secondary ' 
                                htmlFor="cpu"
                            >
                                CPU
                            </label>
                            <input
                                id="cpu"
                                type='number'
                                value={cpu}
                                onChange={(e)=>setCpu(Number(e.target.value))}
                                className='w-full mt-1 p-2 rounded border border-border-default bg-background-primary text-text-primary focus:ring-2 focus:ring-action-primary'
                            />
                        </div>
                        <div>
                            <label 
                                className='text-xs font-semibold text-text-secondary ' 
                                htmlFor="memory"
                            >
                                Memória (GB)
                            </label>
                            <input
                                id="memory"
                                type='number'
                                value={memory}
                                onChange={(e)=>setMemory(Number(e.target.value))}
                                className='w-full mt-1 p-2 rounded border border-border-default bg-background-primary text-text-primary focus:ring-2 focus:ring-action-primary'
                            />
                        </div>
                        <div>
                            <label 
                                className='text-xs font-semibold text-text-secondary ' 
                                htmlFor="disk"
                            >
                                Disco (GB)
                            </label>
                            <input
                                id="disk"
                                type='number'
                                value={disk}
                                onChange={(e)=>setDisk(Number(e.target.value))}
                                className='w-full mt-1 p-2 rounded border border-border-default bg-background-primary text-text-primary focus:ring-2 focus:ring-action-primary'
                            />
                        </div>
                        <div className='flex justify-end gap-3 mt-2'>
                            <button 
                                type='button'
                                onClick={onClose}
                                className='px-4 py-2 text-sm font-semibold text-text-secondary rounded-lg hover:bg-background-secondary'
                            >
                                Cancelar
                            </button>
                            <button 
                                type='submit'
                                className='px-4 py-2 text-sm font-semibold text-white bg-action-primary rounded-lg hover:bg-action-primary/90'
                            >
                                {isEditing ? 'Salvar Alterações' : 'Cadastrar'}
                            </button>
                        </div>

                </form>
            </div>
        </div>
    )
}