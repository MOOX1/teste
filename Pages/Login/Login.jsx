import React from "react";
import { Formik, Form, useFormik } from "formik";
import { TextField, Button, styled } from "@material-ui/core";


const Login = () => {

  const formik = useFormik({
    initialValues: {
      Email: "Vitormeneses87@gmail.com",
      Nome: "vitor Meneses"
    },
    onSubmit: (values) => {
      console.log(values)
    },
  })

  const styled = {
    Button: {
      background: "red"
    },
    Input : {
      color: "red"
    }
  }

  return (
    <div>
      <h1> Login </h1>
      <Formik onSubmit={formik.handleSubmit}>
        <Form>
          <TextField
            onChange={formik.handleChange}
            id="Nome"
            name="Nome"
            label="Nome"
            placeholder=" Escreva um nome"
            defaultValue={formik.initialValues.Nome}
          />
          <TextField
            id="standard-required"
            label="Email"
            name="email"
            type="email"
            placeholder="Escreva um email"
            style={styled.Input}
            defaultValue={formik.initialValues.Email}
            onChange={formik.handleChange}
            helperText={formik.touched.Email && formik.errors.Email}
          />
          <Button style={styled.Button}  type="submit"> Enviar </Button>
        </Form>
      </Formik>
    </div >
  )
}

export default Login