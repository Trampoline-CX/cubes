export type PopoverPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

export const isTop = (placement: PopoverPlacement): placement is 'top' | 'top-start' | 'top-end' =>
  ['top', 'top-start', 'top-end'].indexOf(placement) >= 0

export const isBottom = (
  placement: PopoverPlacement,
): placement is 'bottom' | 'bottom-start' | 'bottom-end' =>
  ['bottom', 'bottom-start', 'bottom-end'].indexOf(placement) >= 0

export const isLeft = (
  placement: PopoverPlacement,
): placement is 'left' | 'left-start' | 'left-end' =>
  ['left', 'left-start', 'left-end'].indexOf(placement) >= 0

export const isRight = (
  placement: PopoverPlacement,
): placement is 'right' | 'right-start' | 'right-end' =>
  ['right', 'right-start', 'right-end'].indexOf(placement) >= 0

export const isStart = (
  placement: PopoverPlacement,
): placement is 'top-start' | 'bottom-start' | 'left-start' | 'right-start' =>
  ['top-start', 'bottom-start', 'left-start', 'right-start'].indexOf(placement) >= 0

export const isEnd = (
  placement: PopoverPlacement,
): placement is 'top-end' | 'bottom-end' | 'left-end' | 'right-end' =>
  ['top-end', 'bottom-end', 'left-end', 'right-end'].indexOf(placement) >= 0
