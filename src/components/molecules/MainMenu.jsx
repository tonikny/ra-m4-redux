import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { main } from '../../constants'

const MainMenuStyled = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    margin-left: 1rem;

    &:first-child {
      margin-left: 0;
    }
  }
`

function MainMenu() {
  return (
    <MainMenuStyled>
      {Object.values(main).map(({ path, label }) => (
        <li key={path}>
          <Link to={path}>{label}</Link>
        </li>
      ))}
    </MainMenuStyled>
  )
}

export default styled(MainMenu)``
