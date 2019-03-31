import { observable, action, decorate } from "mobx"
// import { GQL, CREATE_USER, UPDATE_USER, ALL_USERS } from "../api"
import { toJS } from "mobx"
import axios from "axios"
import _ from "lodash"

class UserStore {
  currentUser = { email: "", partnerId: "" }
  loading = false
  //   userRoles = { admin: "a512e888-b204-4bea-ad73-798811dbfbb6" } // temporary
  //   users = []

  //   constructor() {
  //     Hub.listen("auth", this, "UserStoreListener")
  //   }

  setUser = async email => {
    let currentUser = { email }
    this.currentUser = currentUser
    localStorage.setItem("currentUser", JSON.stringify(currentUser))

    // const user = await axios.post("http://localhost:4000/getuser", {
    //   email
    // })

    // this.currentUser = { ...user.data }

    // this.currentUser = await user.data

    // this.currentUser = {
    //     email:"", partnerId
    // }

    // this.loading = true
    // console.log("Called")
    // this.currentUser = {
    //   email,
    //   partnerId
    // }
    // this.loading = false
  }

  loadUser = async () => {
    this.loading = true
    const { email } = JSON.parse(localStorage.getItem("currentUser"))
    console.log("USER STORE", this.currentUser)

    const user = await axios.post("http://localhost:4000/getuser", {
      email
    })

    const { data } = user

    await console.log("DATA", data)

    this.currentUser = [...data]

    await console.log("??", this.currentUser)
    this.loading = false
    return this.currentUser
  }

  //   loadUser = async () => {
  //     this.loading = true
  //     this.currentUser = JSON.parse(localStorage.getItem("currentUser"))
  //   }

  //   /**
  //    * All Partner Users
  //    * @name All Partner Users
  //    * @return {Promise.<null>} empty promise
  //    */
  //   getAllUsers = async () => {
  //     this.loading = true
  //     try {
  //       const { partnerId } = this.currentUser
  //       const {
  //         data: { User: users }
  //       } = await GQL.query({ query: ALL_USERS, variables: { partnerId } })
  //       this.users = [...users]
  //       this.loading = false
  //       return Promise.resolve()
  //     } catch (error) {
  //       this.loading = false
  //       return Promise.reject(error)
  //     }
  //   }

  //   /**
  //    * Invites (Creates) a User
  //    * @name Get Users Invite User
  //    * @param {string} userRoleId
  //    * @param {string} firstName
  //    * @param {string} lastName
  //    * @param {string} email
  //    * @param {string} accountStatus
  //    * @return {Promise.<null>} empty promise
  //    */
  //   inviteUser = async input => {
  //     this.loading = true
  //     const { partnerId, id: fromUserId } = this.currentUser
  //     const payload = { ...input, partnerId, fromUserId }
  //     try {
  //       const {
  //         data: {
  //           insert_User: {
  //             returning: [user]
  //           }
  //         }
  //       } = await GQL.mutate({
  //         mutation: CREATE_USER,
  //         variables: { input: [payload] }
  //       })
  //       const { id, userRole } = user
  //       this.users = [...this.users, { ...input, id, userRole }]
  //       this.loading = false
  //       return Promise.resolve()
  //     } catch (error) {
  //       this.loading = false
  //       return Promise.reject(error)
  //     }
  //   }

  //   /**
  //    * Updates a User
  //    * @name Update User
  //    * @param {string} id
  //    * @param {Object} changes - an object containing props for change
  //    * @return {Promise.<null>} empty promise
  //    */
  //   updateUser = async (id, changes) => {
  //     this.loading = true
  //     try {
  //       await GQL.mutate({
  //         mutation: UPDATE_USER,
  //         variables: { id, changes }
  //       })
  //       this.users = _.map(this.users, u => {
  //         if (u.id == id) {
  //           return { ...u, ...changes }
  //         } else {
  //           return u
  //         }
  //       }) //[...this.users, { ...input, id, userRole }]
  //       this.loading = false
  //       return Promise.resolve()
  //     } catch (error) {
  //       this.loading = false
  //       return Promise.reject(error)
  //     }
  //   }

  //   /**
  //    * Update Patner Info. Only really
  //    * @name Update Patner Info
  //    * @param {Object} partnerProps
  //    * @param {string} partnerProps.partnerName
  //    * @return {Promise.<null>} empty promise
  //    */
  //   updatePartnerInfo = partnerProps => {
  //     const currentUser = { ...this.currentUser, ...partnerProps }
  //     localStorage.setItem("currentUser", JSON.stringify(currentUser))
  //     this.currentUser = currentUser
  //   }

  logout = async () => {
    // await Auth.signOut({ global: true })
    // this.currentUser = undefined
    // return Promise.resolve()
  }

  //   usersToJS = () => {
  //     return toJS(this.users)
  //   }
}

decorate(UserStore, {
  currentUser: observable,
  loadUser: action,
  setUser: action,
  loading: observable
})

export default new UserStore()
