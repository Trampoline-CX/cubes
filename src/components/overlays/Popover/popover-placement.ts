export enum PopoverPlacement {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
}

export const selectFromPlacement = <T>(
  placement: PopoverPlacement,
  selector: Record<PopoverPlacement, T>,
): T => selector[placement]

export const getOppositePlacement = (placement: PopoverPlacement): PopoverPlacement =>
  selectFromPlacement(placement, {
    top: PopoverPlacement.BOTTOM,
    bottom: PopoverPlacement.TOP,
    left: PopoverPlacement.RIGHT,
    right: PopoverPlacement.LEFT,
  })
