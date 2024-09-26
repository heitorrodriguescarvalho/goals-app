import * as React from 'react'

import { twMerge } from 'tailwind-merge'
import { type VariantProps, tv } from 'tailwind-variants'

const alertVariants = tv({
  base: 'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',

  variants: {
    variant: {
      default: 'bg-background text-foreground',
      success:
        'border-green-400/50 text-green-400 dark:border-green-400 [&>svg]:text-green-400',
      destructive:
        'border-red-400/50 text-red-400 dark:border-red-400 [&>svg]:text-red-400',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={twMerge(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={twMerge(
      'mb-1 font-medium leading-none tracking-tight',
      className
    )}
    {...props}
  />
))
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
))
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertDescription, AlertTitle }
