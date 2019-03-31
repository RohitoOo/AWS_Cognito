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
import axios from "axios"
import { Formik } from "formik"
import * as Yup from "yup"
import { NavLink } from "react-router-dom"
import _ from "lodash"

import { observer, inject } from "mobx-react"
import { compose } from "recompose"
const schema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required"),
  role: Yup.string().required("Role is required")
})
class Partner extends Component {
  componentWillMount = async () => {
    const currentUser = await this.props.userStore.loadUser()

    console.log(...currentUser)
    this.setState({
      currentUser
    })
  }
  state = {
    validation: false,
    invitations: [],
    currentUser: ""
  }
  render() {
    const { validation, invitations, currentUser } = this.state
    return (
      <div>
        <Formik
          ref={_ref => (this.rootFormik = _ref)}
          onSubmit={async (values, { resetForm }) => {
            const partner_id = currentUser[0].partner_id
            const partnerName = values.partnerName
            const partner = {
              partner_id,
              partnerName
            }
            this.props.partnerStore.updatePartner(partner)

            // console.log(result)
            // console.log(result.message)
            // const input = {
            //   firstName: this.rootFormik.state.values.firstName,
            //   lastName: this.rootFormik.state.values.lastName,
            //   email: this.rootFormik.state.values.email,
            //   userRoleId: "a512e888-b204-4bea-ad73-798811dbfbb6",
            //   accountStatus: "Active"
            // }
            // console.log({ input })

            // // Save to Database

            this.setState({
              //   invitations: [...this.props.userStore.users],
              validation: false
            })
            // alert("Invitation Sent")
            resetForm()
          }}
          validateOnChange={validation}
          //   validationSchema={schema}
          initialValues={{
            partnerName: ""
          }}
          render={props => (
            <form onSubmit={props.handleSubmit}>
              <Box pad={"medium"} gap="xsmall" width="large">
                {/* Users */}
                <Box
                  align="center"
                  background="light-1"
                  direction="row"
                  border={{ color: "border", size: "small" }}
                  round="xsmall">
                  <Box justify="center" pad="large">
                    <Text>
                      Welcome!{" "}
                      {currentUser.length > 0 && currentUser[0].username}
                      ...
                    </Text>
                  </Box>
                </Box>

                {/* Users */}
                <Box
                  align="center"
                  background="light-1"
                  direction="row"
                  border={{ color: "border", size: "small" }}
                  round="xsmall">
                  <Box justify="center" pad="large">
                    <Text size="large" weight="bold">
                      Update Partner Information
                    </Text>
                  </Box>
                </Box>

                {/* Update Partner */}
                <Box
                  background="light-1"
                  pad="small"
                  gap="medium"
                  border={{ color: "border", size: "small" }}
                  round="xsmall">
                  <Box gap="small" pad="small" justify="between">
                    <Box>
                      <Text
                        margin="xsmall"
                        color={props.errors.email ? "brand" : null}>
                        Partner Name
                      </Text>
                      <FormField>
                        <TextInput
                          name="partnerName"
                          value={props.values.partnerName}
                          onChange={props.handleChange}
                        />
                      </FormField>
                    </Box>

                    <Box justify="end" margin="small">
                      <Button
                        onClick={() => this.setState({ validation: true })}
                        type="submit"
                        label="Update"
                        color="brand"
                        hoverIndicator="brand"
                      />
                    </Box>
                  </Box>
                </Box>

                {/* Footer */}
                {/* <Box
                  pad="medium"
                  margin="large"
                  background="black"
                  round
                  direction="row"
                  gap="large"
                  justify="end"> */}
                {/* {_.isEmpty(props.errors)
                ? null
                : (console.log(props.errors),
                  (
                    <Button
                      label="Check Missing Fields"
                      color="brand"
                      hoverIndicator="brand"
                      onClick={this.handleMissingFields}
                    />
                  ))} */}

                {/* <Button
                    // disabled={_.isEmpty(props.errors) ? false : true}
                    type="submit"
                    label="Update"
                    color="brand"
                    hoverIndicator="brand"
                  />
                </Box> */}
              </Box>
            </form>
          )}
        />
      </div>
    )
  }
}

const PartnerEnhanced = compose(
  inject("userStore", "partnerStore"),
  observer
)(Partner)
export default PartnerEnhanced
