export const shameStyles = {
  spinner: {
    size: 24,
  },
  skeletonDisplayText: {
    width: 96,
  },
  skeletonHeading: {
    width: 96,
  },
  skeletonBodyText: {
    height: 8,
  },
  skeletonLoading: {
    animationDuration: 800,
  },
  skeleton: {
    minOpacity: 0.45,
  },
  button: {
    pressedScale: 0.99,
  },
  switch: {
    android: {
      track: {
        off: '#E2DEDD',
        on: '#FEA7B3',
      },
      thumb: {
        off: '#FFFFFF',
      },
    },
  },
  card: {
    subdued: {
      backgroundColor: '#F5F1F0',
    },
  },
  topBar: {
    height: 56,
  },
  snackbar: {
    duration: {
      default: 2500,
      longer: 4000,
    },
  },
  popover: {
    zIndex: 99999,
    backdrop: {
      color: 'rgba(0, 0, 0, 0.3)',
    },
  },
  dialog: {
    backdropColor: 'rgba(0, 0, 0, 0.33)',
    defaultWidth: '70%',
    minWidth: 280,
  },
  tooltip: {
    hideAfterDelay: 2500,
  },
  radioButton: {
    size: 16,
    checkSize: 8,
  },
  checkbox: {
    size: 16,
  },
  progressBar: {
    height: 24,
  },
  emptyState: {
    image: {
      size: 200,
    },
  },
  drawerMenu: {
    width: 256,
  },
  sheet: {
    backdropColor: 'rgba(0, 0, 0, 0.33)',
  },
  select: {
    maxHeight: 300,
  },
  slider: {
    track: {
      height: 6,
    },
    knob: {
      size: 24,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
  },
} as const
