'use client';

import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const liquidbuttonVariants = cva(
  "inline-flex items-center transition-colors justify-center cursor-pointer gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[color,box-shadow,transform] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-transparent hover:scale-105 duration-300 transition text-foreground',
        outline:
          'bg-transparent hover:scale-105 duration-300 transition text-foreground',
        secondary:
          'bg-transparent hover:scale-105 duration-300 transition text-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-9 text-xs gap-1.5 px-4 has-[>svg]:px-4',
        lg: 'h-11 px-8 has-[>svg]:px-6',
        xl: 'h-12 px-8 has-[>svg]:px-6',
        xxl: 'h-14 px-10 has-[>svg]:px-8',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface LiquidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidbuttonVariants> {
  asChild?: boolean;
}

function LiquidButton({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: LiquidButtonProps) {
  // Different glass effects based on variant
  const glassStyles = {
    default: {
      shadow:
        'shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)]',
      darkShadow:
        'dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]',
    },
    outline: {
      shadow:
        'shadow-[0_0_4px_rgba(0,0,0,0.02),0_1px_4px_rgba(0,0,0,0.05),inset_2px_2px_0.5px_-2px_rgba(0,0,0,0.4),inset_-2px_-2px_0.5px_-2px_rgba(0,0,0,0.4),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.3),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.3),inset_0_0_4px_4px_rgba(0,0,0,0.06),inset_0_0_1px_1px_rgba(0,0,0,0.03),0_0_8px_rgba(255,255,255,0.1)]',
      darkShadow:
        'dark:shadow-[0_0_6px_rgba(0,0,0,0.02),0_1px_4px_rgba(0,0,0,0.05),inset_2px_2px_0.5px_-2.5px_rgba(255,255,255,0.05),inset_-2px_-2px_0.5px_-2.5px_rgba(255,255,255,0.4),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.3),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.3),inset_0_0_4px_4px_rgba(255,255,255,0.06),inset_0_0_1px_1px_rgba(255,255,255,0.03),0_0_8px_rgba(0,0,0,0.1)]',
    },
    secondary: {
      shadow:
        'shadow-[0_0_4px_rgba(0,0,0,0.02),0_1px_4px_rgba(0,0,0,0.05),inset_2px_2px_0.5px_-2px_rgba(0,0,0,0.35),inset_-2px_-2px_0.5px_-2px_rgba(0,0,0,0.35),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.25),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.25),inset_0_0_4px_4px_rgba(0,0,0,0.05),inset_0_0_1px_1px_rgba(0,0,0,0.02),0_0_8px_rgba(255,255,255,0.08)]',
      darkShadow:
        'dark:shadow-[0_0_6px_rgba(0,0,0,0.02),0_1px_4px_rgba(0,0,0,0.05),inset_2px_2px_0.5px_-2.5px_rgba(255,255,255,0.04),inset_-2px_-2px_0.5px_-2.5px_rgba(255,255,255,0.35),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.25),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.25),inset_0_0_4px_4px_rgba(255,255,255,0.05),inset_0_0_1px_1px_rgba(255,255,255,0.02),0_0_8px_rgba(0,0,0,0.08)]',
    },
  };

  const currentGlass = glassStyles[variant || 'default'] || glassStyles.default;

  const content = (
    <>
      <div
        className={cn(
          'pointer-events-none absolute left-0 top-0 z-0 h-full w-full rounded-full transition-all',
          currentGlass.shadow,
          currentGlass.darkShadow
        )}
      />
      <div
        className='pointer-events-none absolute left-0 top-0 isolate -z-10 h-full w-full overflow-hidden rounded-full'
        style={{ backdropFilter: 'url("#container-glass")' }}
      />
      <span className='relative z-10 flex items-center gap-2'>{children}</span>
      <GlassFilter />
    </>
  );

  if (asChild) {
    // Clone the child element and merge classes
    const child = children as React.ReactElement;
    return (
      <Slot
        data-slot='button'
        className={cn(
          'relative',
          liquidbuttonVariants({ variant, size, className })
        )}
        {...props}
      >
        {React.cloneElement(
          child,
          {
            className: cn('flex items-center gap-2', child.props.className),
          },
          <>
            <div
              className={cn(
                'pointer-events-none absolute left-0 top-0 z-0 h-full w-full rounded-full transition-all',
                currentGlass.shadow,
                currentGlass.darkShadow
              )}
            />
            <div
              className='pointer-events-none absolute left-0 top-0 isolate -z-10 h-full w-full overflow-hidden rounded-full'
              style={{ backdropFilter: 'url("#container-glass")' }}
            />
            <span className='relative z-10 flex items-center gap-2'>
              {child.props.children}
            </span>
            <GlassFilter />
          </>
        )}
      </Slot>
    );
  }

  return (
    <button
      data-slot='button'
      className={cn(
        'relative flex items-center gap-2',
        liquidbuttonVariants({ variant, size, className })
      )}
      {...props}
    >
      {content}
    </button>
  );
}

LiquidButton.displayName = 'LiquidButton';

function GlassFilter() {
  return (
    <svg className='hidden'>
      <defs>
        <filter
          id='container-glass'
          x='0%'
          y='0%'
          width='100%'
          height='100%'
          colorInterpolationFilters='sRGB'
        >
          {/* Generate turbulent noise for distortion */}
          <feTurbulence
            type='fractalNoise'
            baseFrequency='0.05 0.05'
            numOctaves='1'
            seed='1'
            result='turbulence'
          />

          {/* Blur the turbulence pattern slightly */}
          <feGaussianBlur
            in='turbulence'
            stdDeviation='2'
            result='blurredNoise'
          />

          {/* Displace the source graphic with the noise */}
          <feDisplacementMap
            in='SourceGraphic'
            in2='blurredNoise'
            scale='70'
            xChannelSelector='R'
            yChannelSelector='B'
            result='displaced'
          />

          {/* Apply overall blur on the final result */}
          <feGaussianBlur in='displaced' stdDeviation='4' result='finalBlur' />

          {/* Output the result */}
          <feComposite in='finalBlur' in2='finalBlur' operator='over' />
        </filter>
      </defs>
    </svg>
  );
}

export { LiquidButton, liquidbuttonVariants };
