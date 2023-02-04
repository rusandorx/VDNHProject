import cl from './CustomMap.module.css'
import React, { useRef, useState } from 'react'
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps'
import { usePoints } from '../../hooks'

export const CustomMap = () => {
  const [ymaps, setYmaps] = useState(null)
  const { data: points } = usePoints()
  const routes = useRef(null)
  const map = useRef(null)

  const onLoad = (ymap) => {
    setYmaps(ymap)
  }

  const getRoute = ref => {
    if (ymaps) {
      const multiRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: [[55.831916666036065, 37.62575707838934], [55.83374020944655, 37.62685141966741]],
        params: {
          routingMode: 'pedestrian'
        }
      }, {
        wayPointVisible: false,
        boundsAutoApply: true,

        routeActivePedestrianSegmentStrokeStyle: 'solid',
        routeActivePedestrianSegmentStrokeColor: '#00CDCD',
      })

      routes.current = multiRoute
      ref.geoObjects.add(multiRoute)
    }
  }

  return (
    <YMaps query={{ lang: 'en_RU', apikey: process.env.REACT_APP_YMAPS_API_KEY }}>
      <Map className={cl.map}
           defaultState={{ center: [55.753994, 37.622093], zoom: 11 }}
           modules={['multiRouter.MultiRoute']}
           onLoad={onLoad}
           instanceRef={ref => {
             if (!ref) return
             getRoute(ref)
             map.current = ref
             ref.behaviors.disable(['scrollZoom'])
           }}
      >
        {points?.map(point => <Placemark geometry={[point.longitude, point.latitude]}/>)}
      </Map>
    </YMaps>
  )
}

export default CustomMap
