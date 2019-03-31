import React, { Component } from "react"
import {
  Grommet,
  Box,
  Image,
  Text,
  FormField,
  TextInput,
  Button,
  Select
} from "grommet"
import theme from "../theme"
import { Formik } from "formik"
import { Switch, Route, Redirect } from "react-router-dom"
import User from "./User/User"
import Partner from "./Partner/Partner"
import { BrowserRouter } from "react-router-dom"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Grommet theme={theme}>
          <Box align="center" justify="center">
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/user" />} />
              <Route path="/user" component={User} />
              <Route path="/partner" component={Partner} />
            </Switch>
          </Box>
        </Grommet>
      </BrowserRouter>
    )
  }
}

export default App
