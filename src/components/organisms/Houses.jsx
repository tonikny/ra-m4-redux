import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Text } from '../atoms'
import { HouseCard } from '../molecules'
import { FlexBox, Grid } from '../../styles'
import { getHouses } from '../../store/houses.slice'

const HousesStyled = styled(FlexBox)``

function Houses() {
  const itemsPerPage = 9
  const [currentPage, setCurrentPage] = useState(1)

  const dispatch = useDispatch()
  const houses = useSelector((state) => state.houses.houses)
  const { byId, allIds, byCity, byType, activeCity, activeType } = houses
  const reqStatus = useSelector((state) => state.houses.reqStatus)

  // Mapear debajo, no de esta manera
  // Demasiado complicada la lógica. Si crece a 5 filtro s se pierde el hilo
  let housesArr = [] // No guardar nada en let de esta maneram no es necesario
  if (reqStatus === 'success') {
    housesArr = allIds
    if (activeCity)
      if (activeType)
        housesArr = byCity[activeCity].filter((id) =>
          byType[activeType].includes(id),
        )
      else housesArr = byCity[activeCity]
    else if (activeType) housesArr = byType[activeType]
  }
  const housesArrPage = housesArr.slice(0, itemsPerPage * currentPage)

  useEffect(() => {
    dispatch(getHouses())
  }, [dispatch])

  return (
    <HousesStyled>
      {reqStatus === 'initial' && <Text>Starting ...</Text>}
      {reqStatus === 'loading' && <Text>Loading ...</Text>}
      {reqStatus === 'failed' && <Text>Error!</Text>}
      {reqStatus === 'success' && housesArrPage.length === 0 && (
        <Text>No hay coincidencias</Text>
      )}
      {reqStatus === 'success' && housesArrPage.length > 0 && (
        <Grid gridGap="32px">
          {/* Aquí deberías de filtrar y luego mapear sobre allIds => byId[id] */}
          {/* Crea una función de filtrado en helpers y dentro de esa puedes componer varias, por tipo, ciudad, etc... */}

          {housesArrPage.map((id) => (
            <HouseCard
              key={id}
              title={byId[id].title}
              price={`${byId[id].price}€`}
              img={byId[id].image}
              link=""
            />
          ))}
        </Grid>
      )}
      {housesArrPage.length < housesArr.length && (
        <FlexBox align="center">
          <Button
            style={{ marginTop: '2rem' }}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Load more
          </Button>
        </FlexBox>
      )}
    </HousesStyled>
  )
}

export default styled(Houses)``
