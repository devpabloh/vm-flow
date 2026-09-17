import {Handle, Position } from '@xyflow/react'
import { twMerge } from 'tailwind-merge'

interface CustomNodeProps {
    data: {
        label: string;
        type: string;
        description: string;
        onHover?: ()=> void
        onClick?: ()=> void
    }
}

export function CustomServiceNode({data}: CustomNodeProps) {
    return (
        <div
            className={twMerge("px-4 py-2 shadow-md rounded-md bg-white border-2 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105",
        data.type === 'vm' ? "border-blue-500" : "border-slate-300")}
            onMouseEnter={data.onHover}
            onClick={data.onClick}
        >
            <Handle type='target' position={Position.Top} className='w-2 h-2'/>
            <div className='font-bold text-slate-800'>{data.label}</div>
            <div className='text-xs text-slate-500'>{data.description}</div>
            <Handle type='source' position={Position.Bottom} className='w-2 h-2'/>
        </div>
    )
}