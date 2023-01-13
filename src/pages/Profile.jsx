import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Text } from '../components/atoms'
import { Body } from '../components/layout'
import { InputTextGroup } from '../components/molecules'
import {
  updateFirstSurname,
  updateName,
  updateSecondSurname,
} from '../store/user.slice'
import { Container, FlexBox } from '../styles'

function UserProfile() {
  const user = useSelector((state) => state.user)

  return (
    <FlexBox>
      <Text>
        <strong>Name</strong>: {user.name}
      </Text>
      <Text>
        <strong>Apellidos</strong>: {user.surname.first} {user.surname.second}
      </Text>
    </FlexBox>
  )
}

function UpdateUserForm() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [userFormData, setUserFormData] = useState({ ...user })
  const handleUpdate = () => {
    dispatch(updateName(userFormData.name))
    dispatch(updateFirstSurname(userFormData.surname.first))
    dispatch(updateSecondSurname(userFormData.surname.second))
  }

  return (
    <FlexBox as="form">
      <InputTextGroup
        id="nombre"
        label="Nombre"
        value={userFormData.name}
        onChange={(e) => setUserFormData({ ...user, name: e.target.value })}
      />
      <InputTextGroup
        id="primer-apellido"
        label="Primer Apellido"
        value={userFormData.surname.first}
        onChange={(e) =>
          setUserFormData({
            ...user,
            surname: {
              ...userFormData.surname,
              first: e.target.value,
            },
          })
        }
      />
      <InputTextGroup
        id="segundo-apellido"
        label="Segundo Apellido"
        value={userFormData.surname.second}
        onChange={(e) =>
          setUserFormData({
            ...user,
            surname: {
              ...userFormData.surname,
              second: e.target.value,
            },
          })
        }
      />
      <Button type="button" onClick={handleUpdate}>
        Enviar
      </Button>
    </FlexBox>
  )
}
function Profile() {
  return (
    <Body>
      <Container direction="row">
        <UserProfile />
        <UpdateUserForm />
      </Container>
    </Body>
  )
}

export default Profile
