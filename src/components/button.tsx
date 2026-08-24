import { cva, type VariantProps } from "class-variance-authority"
import SpinnerIcon from "../assets/vite.svg?react"
import { Icon } from "./icon"
import { Text } from "./text"

const buttonVariants = cva(
    "flex items-center justify-center cursor-pointer transition rounded-lg group gap-2",
    {
        variants: {
            variant: {
                primary: "bg-gray-200 hover:bg-pink-light"
            },
            size: {
                md: "h-14 py-4 px-5"
            },
            disabled: {
                true: "opacity-50 pointer-events-none"
            },
            handling: {
                true: "pointer-events-none"
            }
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
            disabled: false,
            handling: false
        }
    }
)

const buttonTextVariants = cva("", {
    variants: {
        variant: {
            primary: "text-gray-400"
        }
    },
    defaultVariants: {
        variant: "primary"
    }
})

const buttonIconVariants = cva("transition", {
    variants: {
        variant: {
            primary: "fill-pink-base"
        },
        size: {
            md: "w-5 h-5"
        }
    },
    defaultVariants: {
        variant: "primary",
        size: "md"
    }
})

interface ButtonProps
    extends Omit<React.ComponentProps<"button">, "children" | "disabled" | "size">,
        VariantProps<typeof buttonVariants> {
    children: string
    icon?: React.ComponentProps<typeof Icon>["svg"]
}

export function Button({
    variant,
    size,
    disabled,
    className,
    children,
    icon,
    handling,
    ...props
}: ButtonProps) {
    const IconComponent = handling ? SpinnerIcon : icon

    return (
        <button
            {...props}
            type={props.type ?? "button"}
            aria-busy={handling || undefined}
            disabled={Boolean(disabled || handling)}
            className={buttonVariants({ variant, size, disabled, handling, className })}
        >
            {IconComponent && (
                <Icon
                    svg={IconComponent}
                    animate={handling}
                    aria-hidden="true"
                    focusable="false"
                    className={buttonIconVariants({ variant, size })}
                />
            )}
            <Text variant="body-md-bold" className={buttonTextVariants({ variant })}>
                {children}
            </Text>
        </button>
    )
}
