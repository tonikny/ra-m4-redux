import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Text } from '../atoms'
import { HouseCard } from '../molecules'
import { FlexBox, Grid } from '../../styles'
import { getHouses } from '../../store/houses.slice'
import { applyFilters, paginatedIds, isLastPage } from '../../helpers'

const HousesStyled = styled(FlexBox)``

function Houses() {
  const itemsPerPage = 9
  const [currentPage, setCurrentPage] = useState(1)

  const dispatch = useDispatch()
  const { byId, allIds, activeCity, activeType } = useSelector(
    (state) => state.houses.houses,
  )
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.houses.reqStatus,
  )

  // filtro aquí para reutilizar el resultado para la paginación
  const filteredIds = allIds.filter((id) =>
    applyFilters(byId[id], activeType, activeCity),
  )

  useEffect(() => {
    dispatch(getHouses())
  }, [dispatch])

  return (
    <HousesStyled>
      {isLoading && <Text>Loading ...</Text>}
      {isError && <Text>Error!</Text>}
      {isSuccess && filteredIds.length === 0 && (
        <Text>No hay coincidencias</Text>
      )}
      {isSuccess && allIds.length > 0 && (
        <Grid gridGap="32px">
          {paginatedIds(filteredIds, itemsPerPage, currentPage).map((id) => (
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
      {!isLastPage(filteredIds, itemsPerPage, currentPage) && (
        <FlexBox align="center">
          <Button
            style={{ marginTop: '2rem' }}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Cargar más
          </Button>
        </FlexBox>
      )}
    </HousesStyled>
  )
}

export default styled(Houses)``
