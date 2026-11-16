import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn, usePortalContainer } from "@/utils/index"

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

type InteractOutsideEvent = Parameters<
  NonNullable<React.ComponentProps<typeof PopoverPrimitive.Content>["onInteractOutside"]>
>[0]

const isOwnTriggerEvent = (event: InteractOutsideEvent, contentId: string | undefined): boolean => {
  if (!contentId) return false

  return event.detail.originalEvent.composedPath().some((node) => (
    node instanceof Element && node.getAttribute("aria-controls") === contentId
  ))
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ref,
  onInteractOutside,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  const portalContainer = usePortalContainer()
  const contentRef = React.useRef<HTMLDivElement | null>(null)

  const setContentRef = React.useCallback((node: HTMLDivElement | null) => {
    contentRef.current = node
    if (typeof ref === "function") ref(node)
    else if (ref) ref.current = node
  }, [ref])

  const handleInteractOutside = React.useCallback((event: InteractOutsideEvent) => {
    onInteractOutside?.(event)
    if (!event.defaultPrevented && isOwnTriggerEvent(event, contentRef.current?.id)) {
      event.preventDefault()
    }
  }, [onInteractOutside])

  return (
    <PopoverPrimitive.Portal container={portalContainer}>
      <PopoverPrimitive.Content
        ref={setContentRef}
        data-slot="popover-content"
        onInteractOutside={handleInteractOutside}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
