import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Injectable({
  providedIn: "root"
})
export class ApolloService {
  constructor(private apollo: Apollo) {}

  getUser(): any {
    return this.apollo.use("ASP").watchQuery<any>({
      query: gql`
        query($userId: String!) {
          user(userId: $userId) {
            email
            phoneNumber
            blockUsers {
              blockId
            }
            subscriptions {
              subscriptionId
              subscriptionName
              user {
                userId
              }
            }
          }
        }
      `,
      // I NEED TO UNCOMMENT THIS LATER these are the varible to send the query
      variables: {
        userId: localStorage.getItem("currnetUser")
      },
      errorPolicy: "all"
    }).valueChanges;
  }
  getAllServices(): any {
    return this.apollo.use("ASP").watchQuery<any>({
      query: gql`
        {
          services {
            aServiceId
            serviceName
            isActive
          }
        }
      `,
      errorPolicy: "all"
    }).valueChanges;
  }
  getServiceById(serviceId) {
    return this.apollo.use("ASP").watchQuery<any>({
      query: gql`
        query($serviceId: Int!) {
          service(serviceId: $serviceId) {
            isActive
            aServiceName
          }
        }
      `,
      variables: {
        serviceId: serviceId
      },
      errorPolicy: "all"
    }).valueChanges;
  }
  getServicebyName(service): any {
    return this.apollo.use("ASP").watchQuery<any>({
      query: gql`
        query($name: String!) {
          oneService(name: $name) {
            _id
            subscriptionId {
              _id
            }
          }
        }
      `,
      variables: {
        name: service
      },
      errorPolicy: "all"
    }).valueChanges;
  }
  //works
  getsUser(id) {
    return this.apollo.watchQuery<any>({
      query: gql`
         query{
           oneUser(id:${id}){
             _id
             isAdmin
             isSuperAdmin
             email
             password
             userSubscription{
               _id
               user{
                 _id
               }
               block{
                 _id
                 name
                 location
               }
             }
           }
         }
        `,
      errorPolicy: "all"
    }).valueChanges;
  }

  createUser(user) {
    console.log(user);
    //create subscreption if new user
    return this.apollo.watchQuery<any>({
      query: gql`
        mutation {
          createUser(
            userInput: { email: "user1", password: "user1", isAdmin: false }
          ) {
            _id
            email
            password
            isAdmin
          }
        }
      `,
      errorPolicy: "all"
    }).valueChanges;
  }
  getServicesByBlockId(blockId) {
    return this.apollo.use("ASP").watchQuery<any>({
      query: gql`
        query($blockId: Int!) {
          blockServices(blockId: $blockId) {
            blockName
            blockSubscriptions {
              subscription {
                aServiceSubscriptions {
                  service {
                    aServiceId
                    isActive
                    serviceName
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        blockId: blockId
      },
      errorPolicy: "all"
    }).valueChanges;
  }
  updateServiceById(serviceId, state) {
    return this.apollo.use("ASP").mutate<any>({
      mutation: gql`
        mutation($inputServiceId: Int!, $stateInput: Boolean!) {
          updateServiceState(
            inputServiceId: $inputServiceId
            stateInput: $stateInput
          )
        }
      `,
      variables: {
        inputServiceId: serviceId,
        stateInput: state
      },
      errorPolicy: "all"
    });
  }
  getBlocksByAdminId(id) {
    //get all info of block by id
    return this.apollo.use("ASP").watchQuery<any>({
      query: gql`
        query {
          blocks {
            blockName
            blockId
            blockSubscriptions {
              subscriptionId
              subscription {
                subscriptionName
              }
            }
          }
        }
      `,
      errorPolicy: "all"
    }).valueChanges;
  }

  getBlocks() {
    //get all blocks id s and name s
    return this.apollo.watchQuery<any>({
      query: gql`
        query {
          blocks {
            blockId
            blockName
            blockSubscriptions {
              subscriptionId
              subscription {
                subscriptionName
              }
            }
          }
        }

      `,
      errorPolicy: "all"
    }).valueChanges;
  }

  getUsersOfBlock(block) {
    //get all user s inside this block(id)
    // console.log(typeof(+block), "inside apolo")
    return this.apollo.use("ASP").watchQuery<any>({
      query: gql`
        query($blockId: Int!) {
          block(blockId: $blockId) {
            blockSubscriptions {
              subscriptionId
              subscription {
                user {
                  email
                  userId
                  phoneNumber
                }
              }
            }
          }
        }
      `,
      variables: {
        blockId: +block
      },
       errorPolicy: "all"
     })
     .valueChanges
   } 
 
 //works
   createNewBlock(Block) {
      console.log(Block, 'inside newblock')
    return this.apollo
    .mutate<any>({

      mutation: gql`
        mutation($name: String!, $location: String!) {
          createBlock(blockInput: { name: $name, location: $location }) {
            _id
            name
            location
          }
        }
      `,
      variables: {
        name: Block.name,
        location: Block.location
      },
      errorPolicy: "all"
    });
  }

  createNewBlockASP(Block) {
    console.log(Block, "inside newblock");
    return this.apollo.use("ASP").mutate<any>({
      mutation: gql`
        mutation($name: String!, $location: String!) {
          createBlock(input: { blockName: $name, location: $location })
        }
      `,
      variables: {
        name: Block.name,
        location: Block.location
      },
      errorPolicy: "all"
    });
  }

  getSubscriptionBYName(subName): any {
    return this.apollo.use("ASP").watchQuery<any>({
      query: gql`
        query($aServiceName: String!) {
          serviceByName(aServiceName: $aServiceName) {
            aServiceId
            serviceName
            isActive
          }
        }
      `,
      variables: {
        aServiceName: subName
      },
      errorPolicy: "all"
    }).valueChanges;
  }

  createMessageASP(msg){
    //mutation{createMessage(input:{content:"where is thee money for alivator", senderId:13, toList:[17]})}
    return this.apollo.use("ASP").mutate<any>({
      mutation: gql`
      mutation{createMessage(input:{content:$content, senderId:$senderId, toList:$arr})}
      `,
      variables: {
        content: msg.content,
        senderId: msg.senderId,
        arr: msg.arr
      },
      errorPolicy: "all"
    });
  }
  getMessageASP(){
    return this.apollo.use("ASP").watchQuery<any>({
      query: gql`
       query{usersWithMessages{email,userMessages{message{content,sender{email}}}}}     
       `,     
     
      errorPolicy: "all"
    }).valueChanges
  }
}
