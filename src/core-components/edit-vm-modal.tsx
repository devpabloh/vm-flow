import { Text } from '../components/text';
import type {VirtualMachine} from '../core-components/vm-table'
import {useState} from 'react'

interface EditVmModalProps {
    vm: VirtualMachine;
    onClose: ()=> void;
    onSave: (vm: VirtualMachine)=> void;
}


export function EditVmModal({vm,onClose,onSave}: EditVmModalProps){
    const [name, setName] = useState(vm.name)
    const [cpu, setCpu] = useState(vm.cpu)
    const [memory, setMemory] = useState(vm.memory)
    const [disk, setDisk] = useState(vm.disk)

    function handleSubmit(e: React.SubmitEvent){
        e.preventDefault();

        onSave({
            ...vm,
            name,
            cpu,
            memory,
            disk
        });
    }


    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
            <div>
                <Text as='h2' variant='h2'>Editar máquina virtual: {vm.name}</Text>
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
                                Salvar
                            </button>
                        </div>

                </form>
            </div>
        </div>
    )
}