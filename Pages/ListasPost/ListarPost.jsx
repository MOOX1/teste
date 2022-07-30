import React from "react";
import useFetch from "../../hook/useFetch";
import api from "../../service/api";

import { Table } from "@material-ui/core";
import { TableContainer } from "@material-ui/core";
import { TableHead } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import { TableCell } from "@material-ui/core";
import { TableBody } from "@material-ui/core";
import { Button } from "@material-ui/core"
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { mutate as mutateGlobal } from "swr";


const useStyle = makeStyles({
  button: {
    background: "blue",
    "&:hover": {
      background: "#00e676",
      color: "white"
    },
  },
  Container: {
    width: "60%",
    margin: "auto",
    height: "100vh"
  },
  Nav: {
    background: "green",
    width: "80%",
  },
  Link: {
    textDecoration: "none",
    color: "white",
    position: "relative",
    background: "#00e676"

  }
})

const ListarPost = () => {
  const classes = useStyle()

  const { data, mutate } = useFetch("users")
  console.log(data)

  if (!data) {
    return <CircularProgress color="secondary" />
  }
  const HandleEstado = (id) => {


    const upDateUser = data.map(user => {
      if (user.id === id) {
        if (user.active == false) {
          mutateGlobal(`users/${id}`, { ...user, active: true })
          return { ...user, active: true };
        }

        if (user.active == true) {
          mutateGlobal(`users/${id}`, { ...user, active: false })
          return { ...user, active: false };
        } else {
          mutateGlobal(`users/${id}`, { ...user, active: true })
          return { ...user, active: true };
        }
      }
      return user;
    })
    mutate(upDateUser, false)
  }

  const HandleDeletar = (id) => {
    api.delete(`users/${id}`)
    mutateGlobal(`users/${id}`, {})
  }

  return (
    <TableContainer className={classes.Container}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow className={classes.Nav}>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Estado</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">
              <Link className={classes.Link} to="/cadastrar" ><Button className={classes.Link} color="primary" variant="contained" size="small">Cadastrar</Button></Link>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(user => (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">
                <Button className={classes.button} onClick={() => HandleEstado(user.id)} variant="contained" size="small">
                  {user.active ? "ativo" : "inativo"}
                </Button>
              </TableCell>
              <TableCell align="row">
                <Link className={classes.Link} to={`/detalhes/${user.id}`}><Button variant="contained" size="small">Detalhes</Button></Link>
              </TableCell>
              <TableCell align="row">
                <Button variant="contained" onClick={() => HandleDeletar(user.id)} size="small">Deletar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default ListarPost;