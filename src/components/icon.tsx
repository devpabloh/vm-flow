import React from "react"
import { cva, type VariantProps } from "class-variance-authority"


const iconVariants = cva("", {
    variants: {
        animate: {
            false: "",
            true: "animate-spin"
        },
        size: {
            sm: "w-6 h-6"
        }
    },
    defaultVariants: 
    {
        animate: false,
        size: 'sm'
    }
})

interface IconProps extends React.ComponentProps<'svg'>, VariantProps<typeof iconVariants>{
    svg: React.FC<React.ComponentProps<'svg'>>
}

export function Icon({svg: SvgComponent, animate, size, className, ...props}: IconProps){
    return <SvgComponent {...props} className={iconVariants({animate,size, className})}/>
}