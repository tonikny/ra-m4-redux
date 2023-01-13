import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { colors, Container, dimensions, FlexBox } from '../../styles'
import { Button, Icon } from '../atoms'
import { SelectGroup } from '../molecules'
import { updateActiveType, updateActiveCity } from '../../store/houses.slice'

const SubHeaderStyled = styled(FlexBox)`
  padding-top: ${dimensions.spacing.xl};
  padding-bottom: ${dimensions.spacing.xl};
  background-color: ${colors.clearBlueBg};
  border-top: 1px solid ${colors.border.clearBlueBg};
  border-bottom: 1px solid ${colors.border.clearBlueBg};
`

const FormStyled = styled(FlexBox).attrs({ as: 'form' })`
  ${SelectGroup} {
    &:first-of-type {
      padding: 0.5rem 1rem;
      border-radius: 4px;
      margin-right: 1rem;
    }
  }

  ${Button} {
    background-color: ${colors.blue};
  }
`

function SubHeader({ ...props }) {
  const dispatch = useDispatch()
  const houses = useSelector((state) => state.houses.houses)
  const { cities, types, activeCity, activeType } = houses

  // Resetear opciones de búsqueda al cargar la página
  useEffect(() => {
    dispatch(updateActiveCity(null))
    dispatch(updateActiveType(null))
  }, [dispatch])

  return (
    <SubHeaderStyled {...props}>
      <Container>
        <FormStyled direction="row" align="center">
          <SelectGroup
            id="type"
            label="Tipo"
            defaultText="Piso, chalet o garaje..."
            selected={activeType}
            hideLabel
            options={types.map((type) => ({ value: type, text: type }))}
            onChange={(e) => dispatch(updateActiveType(e.target.value))}
          />

          <SelectGroup
            id="ciudad"
            label="Ciudad"
            defaultText="Madrid, Barcelona o Zaragoza..."
            selected={activeCity}
            hideLabel
            options={cities.map((city) => ({ value: city, text: city }))}
            onChange={(e) => dispatch(updateActiveCity(e.target.value))}
          />

          <Button>
            <Icon icon="search" />
          </Button>
        </FormStyled>
      </Container>
    </SubHeaderStyled>
  )
}

export default styled(SubHeader)``
