const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {

      contactListName: "",
      contacts: [],
    },
    //****************************************************************** */

    actions: {       
      deleteContactList: async (clName) => {
        const method = "DELETE";
        const response = await getActions().queryhandler(method, clName, null);
        if(response.ok){
          console.log(response);
        }
      },

      signup: async (clName) => {
        const method = "POST";
        const response = await getActions().queryhandler(method, clName, null);
        if(response){
          setStore({contactListName: clName,contacts: []});
        }
        else{
          setStore({contactListName: "no existe"});
        }
      },

      

      login: async(clName) => {
        const method = "GET";
        const response = await getActions().queryhandler(method, clName, null)
          if(response){
            setStore({contactListName: clName,contacts: response.contacts});
            console.log(response.contacts);
          }
          else{
            console.log("No existe la agenda");
            setStore({contactListName: "no existe"});
          }

      },

      addContact: async(clName, body) => {
        const method = "POST";
        const response = await getActions().queryhandler(method, clName+"/contacts/" , body)
        if(response){
          setStore({contacts: getStore().contacts.concat(response)});
          return true
        }
        else{
          return false
        }
        
      },

      updateContact: async(contactID , body) => {
        const method = "PUT";
        const response = await getActions().queryhandler(method, getStore().contactListName+"/contacts/"+contactID , body)
        if(response){
          setStore({contacts: getStore().contacts.map((contact) => contact.id == contactID ? response : contact)});
          return true
        }
      },
      
      deleteContact : async(contactID) => {
        const method = "DELETE";
        const response = await getActions().queryhandler(method, getStore().contactListName+"/contacts/"+contactID , null)
        if(response){
          setStore({contacts: getStore().contacts.filter((contact) => contact.id !== contactID)});
        }
        else{
          console.log("No se pudo borrar el contacto");
        }
      },


      queryhandler: async (method, mod, body) => {
        let resquest;
        const url = "https://playground.4geeks.com/contact/agendas/";
        if(body === null){
          resquest = {
            method: method, 
            headers: {
              "Content-Type": "application/json",
            },
          };
        }
        else{
          resquest = {
            method: method, 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          };
        }
        console.log(url + mod);
        console.log(resquest);
        const response = await fetch(url + mod, resquest)
        console.log(response);
        if(response.ok){
          if(method === "DELETE"){
            return true
          }
          else{
          const data = await response.json()
          console.log(data);
          return data}

        }
        else{
          return false
        }
      },
    },
  };
};

export default getState;
