import React, { useContext } from 'react'
import cl from './PointList.module.css'
import { usePoints } from '../../hooks'
import { MapContext } from '../../context/MapContext'
import cn from 'classnames'

const PointList = () => {
  const { isLoading, error, data } = usePoints()
  const { addRefPoint, removeRefPoint, isInRefPoints } = useContext(MapContext)

  if (isLoading) return <li className={cl.list}></li>
  if (error) return <div>Error occured</div>

  return (
    <ul className={cl.list}>
      {data.map(point => <li
        className={cn(cl.list__item, { [cl.list__item_chosen]: isInRefPoints([point.longitude, point.latitude]) })}
        key={point.code}
        onClick={() => {
          isInRefPoints([point.longitude, point.latitude])
            ? removeRefPoint([point.longitude, point.latitude])
            : addRefPoint([point.longitude, point.latitude])
        }}>
        {point.title}
      </li>)}
    </ul>
  )
}

export default PointList
