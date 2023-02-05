import cl from './CustomMap.module.css'
import React, { useContext, useRef, useState } from 'react'
import { Map, Placemark, YMaps, ZoomControl } from '@pbe/react-yandex-maps'
import { usePoints } from '../../hooks'
import { MapContext } from '../../context/MapContext'

const categoryToColor = {
  'Развлечения': '#ee5041',
  'Павильон': '#000',
  'Музей': '#bbb',
  'Вход': '#22bb30'
}

const defaultMapState = { center: [55.828693, 37.633724], zoom: 16 }

export const CustomMap = () => {
  const [ymaps, setYmaps] = useState(null)
  const { data: points } = usePoints()
  const {curRefPoints: referencePoints} = useContext(MapContext)

  const routes = useRef(null)
  const map = useRef(null)

  const onLoad = (ymap) => {
    setYmaps(ymap)
  }

  const getRoute = ref => {
    if (ymaps && referencePoints?.length) {
      const multiRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints,
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
    <YMaps query={{ lang: 'ru_RU', apikey: process.env.REACT_APP_YMAPS_API_KEY }}>
      <Map className={cl.map}
           defaultState={defaultMapState}
           modules={['multiRouter.MultiRoute']}
           onLoad={onLoad}
           instanceRef={ref => {
             if (!ref) return
             getRoute(ref)
             map.current = ref
             ref.behaviors.disable(['scrollZoom'])
           }}
      >
        <ZoomControl/>
        {points?.map(point => {
          return <Placemark geometry={[point.longitude, point.latitude]}
                            defaultOptions={{ iconColor: categoryToColor[point.category.slice(1, point.category.length - 1)] || '#dddddd' }}
          >
          </Placemark>
        })}
      </Map>
    </YMaps>
  )
}

export default CustomMap
