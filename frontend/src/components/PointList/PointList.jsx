import cl from './PointList.module.css'
import React, { useContext, useState } from 'react'
import { usePoints } from '../../hooks'
import { MapContext } from '../../context/MapContext'
import PointCard from '../PointCard/PointCard'

export const PointList = () => {
  const { isLoading, error, data: points } = usePoints()
  const {
    addRefPoint,
    removeRefPoint,
    isInRefPoints,
    setMapCenter,
    startPointCode,
    setRouteProps
  } = useContext(MapContext)
  const [searchValue, setSearchValue] = useState('')

  if (isLoading) return <ul className={cl.list}></ul>
  if (error) return <div>Error occurred</div>

  return (
    <div className={cl.pointList__outer}>
      <label htmlFor="search-form" hidden>
        Search for points here
      </label>
      <input type="search"
             name="search-form"
             id="search-form"
             placeholder="&#x1F50E;&#xFE0E; Поиск"
             value={searchValue}
             className={cl.searchForm__search}
             onChange={event => setSearchValue(event.target.value)}
      />
      <ul className={cl.list}>
        {points.filter(point => point.title.toLowerCase().includes(searchValue.toLowerCase().trim())).map(point => <li
          key={point.code}
        >
          <PointCard
            onClick={() => {
              if (point.code === startPointCode) return
              isInRefPoints(point)
                ? removeRefPoint(point)
                : addRefPoint(point)
              setRouteProps({ time: null, wayLen: 0 })
            }}
            onHover={() => setMapCenter([point.longitude, point.latitude])}
            chosen={isInRefPoints(point)}
            title={point.title}
            category={point.category}
            disabled={point.code === startPointCode}
          />
        </li>)}
      </ul>
    </div>)
}
