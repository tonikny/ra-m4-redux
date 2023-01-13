import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Text } from '../components/atoms'
import { Body } from '../components/layout'
import { getHouses } from '../store/houses.slice'

function Data() {
  const dispatch = useDispatch()
  const houses = useSelector((state) => state.houses.houses)
  const { byId, allIds, byCity, byType, activeCity, activeType } = houses
  const reqStatus = useSelector((state) => state.houses.reqStatus)

  let arr = []
  if (reqStatus === 'success') {
    arr = allIds
    if (activeCity)
      if (activeType)
        arr = byCity[activeCity].filter((id) => byType[activeType].includes(id))
      else arr = byCity[activeCity]
    else if (activeType) arr = byType[activeType]
  }

  useEffect(() => {
    dispatch(getHouses())
  }, [dispatch])

  return (
    <Body>
      {reqStatus === 'initial' && <Text>Starting ...</Text>}
      {reqStatus === 'loading' && <Text>Loading ...</Text>}
      {reqStatus === 'failed' && <Text>Error!</Text>}
      {reqStatus === 'success' && arr.length === 0 && (
        <Text>No hay coincidencias</Text>
      )}
      {reqStatus === 'success' &&
        arr.map((id) => (
          <Text key={id}>
            {byId[id].title} {byId[id].type} {byId[id].city}
          </Text>
        ))}
    </Body>
  )
}

export default Data
