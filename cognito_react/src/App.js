import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import {
  Grommet,
  Box,
  Image,
  Text,
  FormField,
  TextInput,
  Button
} from "grommet"
import theme from "./theme"
import { Formik } from "formik"
import { Auth } from "aws-amplify"

import Amplify from "aws-amplify"
import config from "./credentials"

Amplify.configure({
  Auth: {
    // REQUIRED - Amazon Cognito Identity Pool ID
    identityPoolId: config.identityPoolId,
    // REQUIRED - Amazon Cognito Region
    region: config.region,
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: config.userPoolId,
    // OPTIONAL - Amazon Cognito Web Client ID
    userPoolWebClientId: config.userPoolWebClientId
  }
})

class App extends Component {
  state = {
    code: ""
  }
  render() {
    const { code } = this.state
    return (
      <Grommet theme={theme}>
        <Box direction="row" height="large" overflow={{ horizontal: "hidden" }}>
          <Box basis="1/2">
            <Image
              src="https://thumbs.gfycat.com/CreativeHarmfulAcaciarat-small.gif"
              fit="cover"
            />
          </Box>
          <Box
            basis="1/2"
            tag="header"
            align="center"
            justify="center"
            background="white"
            pad="medium"
            gap="small">
            <Formik
              ref={_ref => (this.rootFormik = _ref)}
              onSubmit={values => {
                console.log("All FORM VALUES")
                console.log(this.rootFormik.state.values)
                console.log(this.rootFormik)

                // AWS Magic

                Auth.signUp({
                  username: this.rootFormik.state.values.username,
                  password: this.rootFormik.state.values.password,
                  attributes: {
                    name: this.rootFormik.state.values.username // optional
                    // phone_number // optional - E.164 number convention
                    // // other custom attributes
                  },
                  validationData: [] //optional
                })

                  .then(data => {
                    console.log({ data })

                    // Redirect to Sign In Page  ----- Pending

                    // // After retrieving the confirmation code from the user
                    // Auth.confirmSignUp(
                    //   this.rootFormik.state.values.username,
                    //   data.userSub,
                    //   {
                    //     // Optional. Force user confirmation irrespective of existing alias. By default set to True.
                    //     forceAliasCreation: true
                    //   }
                    // )
                    //   .then(data => console.log("2", data))
                    //   .catch(err => console.log("2", err))

                    // Auth.resendSignUp(this.rootFormik.state.values.username)
                    //   .then(() => {
                    //     console.log("code resent successfully")
                    //   })
                    //   .catch(e => {
                    //     console.log(e)
                    //   })
                  })
                  .catch(err => console.log("1", err))
              }}
              render={props => (
                <form onSubmit={props.handleSubmit}>
                  <Box direction="row" gap="large">
                    <Box>
                      <FormField label="User Name">
                        <TextInput
                          name="username"
                          value={props.username}
                          onChange={props.handleChange}
                        />
                      </FormField>
                    </Box>
                    <Box>
                      <FormField label="Password">
                        <TextInput
                          name="password"
                          value={props.password}
                          type="password"
                          onChange={props.handleChange}
                        />
                      </FormField>
                    </Box>
                  </Box>
                  <Box>
                    <Button
                      hoverIndicator="brand"
                      type="submit"
                      color="brand"
                      label="Sign Up"
                    />
                  </Box>
                </form>
              )}
            />
          </Box>
        </Box>
      </Grommet>
    )
  }
}

export default App
