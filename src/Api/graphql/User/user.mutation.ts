import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser(
    $firstName: String, 
    $lastName:String, 
    $username:String! 
    $email:String! 
    $password: String! 
    $tatus:UserRole) 
    {
    createUser( 
        firstName:$firstName, 
        lastName:$lastName, 
        username: $username, 
        email:$email, 
        password: $password, 
        status:$status) {
      success
      message
      data {
        userId
        username
        email
        status
      }
    }
  }
`;

export const DELETE_USER = gql`
mutation deleteUser($userId:Sting!){
  deleteUser(userId:$userId){
    sucess,
    message,
    data
  }
}
`;


export const UPDATE_USER = gql`
  mutation updateUser(
    $username:String!
    $email:String!  
    $firstName: String, 
    $lastName:String, 
    $password: String! 
    $tatus:UserRole) 
    {
    updateUser( 
        username: $username, 
        email:$email,
        firstName:$firstName, 
        lastName:$lastName, 
        password: $password, 
        status:$status) {
      success
      message
      data {
        userId,
        firstName,
        lastName,
        email,
        username,
        status
      }
    }
  }
`;