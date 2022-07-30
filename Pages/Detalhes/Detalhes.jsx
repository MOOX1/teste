import React, { useEffect } from "react";
import useFetch from "../../hook/useFetch";
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { mutate as mutateGlobal } from "swr";

const Detalhes = () => {
  const { id } = useParams()
  const { data } = useFetch(`users/${id}`)
  const { data: dataUser, mutate } = useFetch("users")

  if (!data) {
    return <CircularProgress  />
  }

  const HandleEstado = (id) => {


    const upDateUser = dataUser.map(user => {
      if (user.id === id) {
        if (user.active == false) {
          mutateGlobal(`users/${id}`, { ...user, active: true }, false)
          return { ...user, active: true };
        }
        if (user.active == true) {
          mutateGlobal(`users/${id}`, { ...user, active: false }, false)
          return { ...user, active: false };
        } else {
          mutateGlobal(`users/${id}`, { ...user, active: true }, false)
          return { ...user, active: true };
        }
      }
      return user;
    })
    mutate(upDateUser, false)
  }

  return (
    <Paper >
      <Table >
        <TableHead>
          <TableRow>
            <TableCell >ID</TableCell>
            <TableCell align="right" > Usuário</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              {data.id}
            </TableCell>
            <TableCell align="right">{data.name}</TableCell>
            <TableCell align="right">{data.email}</TableCell>
            <TableCell align="right">
              <Button  onClick={() => HandleEstado(data.id)} variant="contained" size="small">
                {data.active ? "ativo" : "inativo"}
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  )
}

export default Detalhes;