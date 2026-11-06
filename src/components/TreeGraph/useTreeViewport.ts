import {
  KeyboardEvent,
  PointerEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react"
import {
  fitTree,
  Size,
  Viewport,
  wheelZoomFactor,
  zoomAt
} from "../../utils/treeViewport"

interface Drag {
  x: number
  y: number
  viewport: Viewport
  node: number | null
  moved: boolean
}

const useViewportLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect

export function useTreeViewport(
  bounds: Size,
  onSelectNode: (value: number) => void
) {
  const stage = useRef<HTMLDivElement>(null)
  const drag = useRef<Drag | null>(null)
  const [size, setSize] = useState<Size>({ width: 1000, height: 600 })
  const [viewport, setViewport] = useState<Viewport>(() =>
    fitTree(bounds, size)
  )
  const [dragging, setDragging] = useState(false)

  useViewportLayoutEffect(() => {
    const element = stage.current
    if (!element) return
    function measure() {
      const width = element.clientWidth
      const height = element.clientHeight
      if (!width || !height) return
      setSize(previous =>
        previous.width === width && previous.height === height
          ? previous
          : { width, height }
      )
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useViewportLayoutEffect(() => {
    setViewport(fitTree(bounds, size))
  }, [bounds, size])

  useEffect(() => {
    const element = stage.current
    if (!element) return
    function onWheel(event: WheelEvent) {
      event.preventDefault()
      if (drag.current) return
      const rect = element.getBoundingClientRect()
      const point = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      }
      const factor = wheelZoomFactor(
        event.deltaY,
        event.deltaMode,
        element.clientHeight
      )
      setViewport(previous => zoomAt(previous, factor, point))
    }
    element.addEventListener("wheel", onWheel, { passive: false })
    return () => element.removeEventListener("wheel", onWheel)
  }, [])

  function resetView() {
    setViewport(fitTree(bounds, size))
  }

  function changeZoom(factor: number) {
    setViewport(previous =>
      zoomAt(previous, factor, { x: size.width / 2, y: size.height / 2 })
    )
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.ctrlKey || event.metaKey || event.altKey) return
    if (event.key === "+" || event.key === "=") {
      event.preventDefault()
      changeZoom(1.2)
    }
    if (event.key === "-") {
      event.preventDefault()
      changeZoom(1 / 1.2)
    }
    if (event.key === "0" || event.key === "Home") {
      event.preventDefault()
      resetView()
    }
    const offsets = {
      ArrowLeft: [40, 0],
      ArrowRight: [-40, 0],
      ArrowUp: [0, 40],
      ArrowDown: [0, -40]
    }
    if (offsets[event.key]) {
      event.preventDefault()
      const [x, y] = offsets[event.key]
      setViewport(previous => ({
        ...previous,
        x: previous.x + x,
        y: previous.y + y
      }))
    }
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || (event.button !== 0 && event.button !== 1)) return
    event.preventDefault()
    event.currentTarget.focus({ preventScroll: true })
    const target = (event.target as Element).closest("[data-node]")
    drag.current = {
      x: event.clientX,
      y: event.clientY,
      viewport,
      moved: false,
      node:
        event.button === 0 && target
          ? Number(target.getAttribute("data-node"))
          : null
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || !drag.current) return
    const x = event.clientX - drag.current.x
    const y = event.clientY - drag.current.y
    if (!drag.current.moved && Math.abs(x) + Math.abs(y) < 4) return
    drag.current.moved = true
    setDragging(true)
    setViewport({
      ...drag.current.viewport,
      x: drag.current.viewport.x + x,
      y: drag.current.viewport.y + y
    })
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary) return
    const start = drag.current
    if (start && !start.moved && start.node !== null) onSelectNode(start.node)
    drag.current = null
    setDragging(false)
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId)
  }

  function cancelDrag() {
    drag.current = null
    setDragging(false)
  }

  return {
    stage,
    size,
    viewport,
    dragging,
    resetView,
    changeZoom,
    interactions: {
      onKeyDown,
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: cancelDrag,
      onLostPointerCapture: cancelDrag,
      onDoubleClick: resetView
    }
  }
}
