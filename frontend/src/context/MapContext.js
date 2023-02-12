import { createContext, useState } from 'react'

const getClosestRoute = (start, points) => {
  const route = [start]
  points = new Set(points)

  while (points.size) {
    const prevPoint = route[route.length - 1]
    let newPoint = { longitude: Infinity, latitude: Infinity }
    for (const point of points) {
      if (Math.hypot(prevPoint.longitude - point.longitude, prevPoint.latitude - point.latitude) < Math.hypot(prevPoint.longitude - newPoint.longitude, prevPoint.latitude - newPoint.latitude))
        newPoint = point
    }
    route.push(newPoint)
    points.delete(newPoint)
  }
  return route
}

export const MapContext = createContext()

export const MapProvider = (props) => {
  const [curRefPoints, setCurRefPoints] = useState([])

  const setPoints = points => {
    if (points.length <= 1) {
      setCurRefPoints(points)
      return
    }
    setCurRefPoints(getClosestRoute(points[0], points.slice(1)))
  }
  const addRefPoint = (point) => {
    if (curRefPoints.some((p) => point.code === p.code)) return
    setPoints([...curRefPoints, point])
  }
  const removeRefPoint = (point) => {
    setPoints(curRefPoints.filter(p => point.code !== p.code))
  }

  const isInRefPoints = (point) => curRefPoints.some(p => p.code === point.code)

  return <MapContext.Provider
    value={{
      curRefPoints,
      setCurRefPoints: setPoints,
      addRefPoint,
      removeRefPoint,
      isInRefPoints,
    }}>{props.children}</MapContext.Provider>
}
