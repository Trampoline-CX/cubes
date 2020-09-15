import _ from 'lodash'
import React, { useContext, useState, useEffect, useMemo, useCallback } from 'react'

export interface Portals {
  Provider: React.FC<PortalProviderProps>
  DestinationPortal: React.FC
  SourcePortal: React.FC<SourcePortalProps>
}

export const portals = {
  /**
   * Create necessary components to place Portals 🌀
   *
   * Since Portals are quite a complex concept because none exist in the real-world (yet...),
   * here are some guidelines:
   *
   * - There should be a single `DestinationPortal`. Only exception would be if you have multiple
   * `Provider`. In this particular case, make sure you have a single `DestinationPortal` in each
   * `Provider`. You can nest `Provider`s if you want. If doing so, placing a `SourcePortal` will
   * render components in the `DestinationPortal` of the closest `Provider`.
   * - If you place a component in a `SourcePortal`, but it doesn't render, make sure:
   *     - That you have a `Provider` wrapping it.
   *     - That there is a `Destination` in this `Provider` to render to.
   *
   * *Remember, the cake is a lie...*
   *
   * @param keyPrefix Prefix to use for generated Portal keys. Keys are generated to provide each component with
   * a unique ID.
   *
   * @returns An object containing 3 components:
   * - `Provider`, which needs to wrap both `DestinationPortal` and `SourcePortal`. This is in fact a
   * React Context providing the portals.
   * - `DestinationPortal`, renders components passed in a `SourcePortal`.
   * - `SourcePortal`, makes `children` render in `DestinationPortal`.
   */
  create: (keyPrefix: string): Portals => {
    // Context providing ability to place multiple portals somewhere else in Component tree.
    const PortalContext = React.createContext<PortalContext>({
      components: {},
      setComponent: () => {},
    })

    /**
     * Provides a place for Components to appear in the component tree.
     */
    const Provider: React.FC<PortalProviderProps> = ({ children }) => {
      const [components, setComponents] = useState<{ [key: string]: React.ReactNode }>({})

      const setComponent = useCallback<PortalContext['setComponent']>(
        (key, component) => {
          setComponents(prev => ({ ...prev, [key]: component || null }))
        },
        [setComponents],
      )

      return (
        <PortalContext.Provider value={{ components, setComponent }}>
          {children}
        </PortalContext.Provider>
      )
    }

    /**
     * Wraps a Component to render them in a different spot in the Component tree.
     */
    const SourcePortal: React.FC<SourcePortalProps> = ({ children }) => {
      const uniqueId = useMemo(() => _.uniqueId(keyPrefix), [])
      const { setComponent } = useContext(PortalContext)

      // When content of Component is updated, update it in the Context too
      useEffect(() => setComponent(uniqueId, children), [children])

      // Removes the Component from the DOM once it is unmounted
      useEffect(
        () => () => {
          setComponent(uniqueId, null)
        },
        [],
      )

      return null
    }

    /**
     * Renders the components.
     */
    const DestinationPortal: React.FC = () => {
      const { components } = useContext(PortalContext)

      return <>{_.values(components)}</>
    }

    return { Provider, SourcePortal, DestinationPortal }
  },
}

interface PortalContext {
  components: { [key: string]: React.ReactNode }
  setComponent: (key: string, component: null | React.ReactNode) => void
}

export interface PortalProviderProps {
  children: React.ReactNode
}

export interface SourcePortalProps {
  children: React.ReactNode
}

// 🎂
