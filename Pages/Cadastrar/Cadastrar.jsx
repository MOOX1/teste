import React from "react"
import { Formik, Form, useFormik, ErrorMessage } from "formik";
import { TextField, Container, makeStyles, Button } from "@material-ui/core";
import useFetch from "../../hook/useFetch";
import { useNavigate, Link } from "react-router-dom";
import api from "../../service/api";

const useStyle = makeStyles({
  Container: {
    width: "30%",
    background: 'white',
    display: 'grid',
    borderRadius: "20px",
    textAlign: "center "
  },
  input: {

  },
  button: {
    color: "white",
    background: "blue"
  }
})
const Cadastrar = () => {

  const { data } = useFetch("users")
  const Navigate = useNavigate()


  const formik = useFormik({
    initialValues: {
      email: "billiBilly@gmail.com",
      nome: "Billy do biruleibe",
      senha: "",
      confirmarSenha: ""
    },
    validate: (values) => {
      const errors = {}
      if (!values.nome) {
        errors.nome = 'O campo nome é obrigatório';
      }

      if (!values.email) {
        errors.email = 'O campo e-mail é obrigatório';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'O email é inválido';
      }

      if (!values.senha) {
        errors.senha = 'O campo senha é obrigatório';
      }

      if (!values.confirmarSenha) {
        errors.confirmarSenha = 'O campo confirmação de senha é obrigatório';
      } else if (values.senha != values.confirmarSenha) {
        errors.confirmarSenha = 'As senhas precisam ser iguais';
      }

      data.map(user => {
        if (user.email === values.email) {
          errors.email = 'O email informado já está cadastrado no sitema';
        }
      });

      return errors;
    },
    onSubmit: (values) => {
      const user = { email: values.email, name: values.nome, password: values.senha }
      api.post("users", user)
      Navigate("/")
    }
  })

  const classes = useStyle()

  return (
    <Formik>
      <Form onSubmit={formik.handleSubmit}>
        <Container className={classes.Container}>
          <h1> Cadastrar usuário </h1>
          <TextField
            onChange={formik.handleChange}
            defaultValue={formik.initialValues.nome}
            className={classes.input}
            id="nome"
            label="Name"
            margin="normal"
            variant="outlined"
            error={formik.touched.nome && Boolean(formik.errors.nome)}
            helperText={formik.touched.nome && formik.errors.nome}
          />
          <ErrorMessage name="nome" />
          <TextField
            onChange={formik.handleChange}
            defaultValue={formik.initialValues.email}
            id="outlined--input"
            label="Email"
            type="email"
            name="email"
            // autoComplete="email"
            margin="normal"
            variant="outlined"
            aria-errormessage="email"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <ErrorMessage name="email" />
          <TextField
            onChange={formik.handleChange}
            defaultValue={formik.initialValues.senha}
            id="senha"
            label="Senha"
            type="password"
            // autoComplete="current-password"
            margin="normal"
            variant="outlined"
            aria-errormessage="senha"
            error={formik.touched.senha && Boolean(formik.errors.senha)}
            helperText={formik.touched.senha && formik.errors.senha}
          />
          <ErrorMessage name="senha" />
          <TextField
            onChange={formik.handleChange}
            defaultValue={formik.initialValues.confirmarSenha}
            id="confirmarSenha"
            label="Confirmar senha"
            type="password"
            name="confirmarSenha"
            // autoComplete="current-password"
            margin="normal"
            variant="outlined"
            aria-errormessage="confirmarSenha"
            error={formik.touched.confirmarSenha && Boolean(formik.errors.confirmarSenha)}
            helperText={formik.touched.confirmarSenha && formik.errors.confirmarSenha}
          />
          <ErrorMessage name="confirmarSenha" />
          <Button type="submit" variant="contained" className={classes.button}>
            Enviar
          </Button>

          <Link to="/" > lista</Link>
        </Container>
      </Form>
    </Formik>
  )
};

export default Cadastrar