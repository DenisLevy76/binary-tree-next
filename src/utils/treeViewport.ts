export interface Point {
  x: number
  y: number
}

export interface Viewport extends Point {
  scale: number
}

export interface Size {
  width: number
  height: number
}

export const MIN_ZOOM = 0.1
export const MAX_ZOOM = 4

export function fitTree(bounds: Size, viewport: Size): Viewport {
  const horizontalPadding = viewport.width < 600 ? 24 : 56
  const topPadding = 66
  const bottomPadding = 40
  const availableWidth = Math.max(1, viewport.width - horizontalPadding * 2)
  const availableHeight = Math.max(
    1,
    viewport.height - topPadding - bottomPadding
  )
  const scale = Math.max(
    MIN_ZOOM,
    Math.min(
      availableWidth / bounds.width,
      availableHeight / bounds.height,
      1.3
    )
  )

  return {
    scale,
    x: (viewport.width - bounds.width * scale) / 2,
    y: topPadding + (availableHeight - bounds.height * scale) / 2
  }
}

export function zoomAt(
  viewport: Viewport,
  factor: number,
  point: Point
): Viewport {
  const scale = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, viewport.scale * factor))
  const ratio = scale / viewport.scale

  return {
    scale,
    x: point.x - (point.x - viewport.x) * ratio,
    y: point.y - (point.y - viewport.y) * ratio
  }
}

export function wheelZoomFactor(
  delta: number,
  mode: number,
  pageHeight: number
): number {
  const pixels = delta * (mode === 1 ? 16 : mode === 2 ? pageHeight : 1)
  return Math.exp(-Math.max(-160, Math.min(160, pixels)) * 0.0025)
}
