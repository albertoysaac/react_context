const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {

      cLNameMod: {
        cListName: "",   
        status: "",
      },
      contacts: [],
    },
    //****************************************************************** */

    actions: {           
      deleteContact: (indexToDelete) => { 
        const store = getStore();
        setStore({
          contacts: store.contacts.filter(
            (contact, index) => index != indexToDelete
          ),
        });
      },

      setCLNameMod: (clName, status) => {
        setStore({
          cLNameMod: {
            cListName: clName,
            status: status,
          },
        });
      },

      clNameCheck: (clName) => {
        const method = "GET";
        getActions()
          .queryhandler(method, clName)
          .then(({ status, data }) => {
            console.log("clNameCheck status");
            console.log(data.slug);
            console.log(data.contacts);
            if (status === 200 && data.slug === clName) {
              if (data.contacts !== undefined && data.contacts !== null) {
                getActions().setCLNameMod(data.slug, status);
                setStore({ contacts: data.contacts });
              }
              if (
                (data.contacts === undefined || data.contacts === null) &&
                data.slug === clName
              ) {
                getActions().setCLNameMod(clName, data.status);
                setStore({ contacts: [] });
              }
            } else {
              throw new Error(
                "Network response was not ok, message: " + response.status
              );
            }
          });
      },

      myContacts: () => {
        const method = "GET";
        console.log("----myContacts----");
        let name = getStore().cLNameMod.cListName;
        let status = getStore().cLNameMod.status;
        console.log(name, status);
        if (name !== "" && status === 200) {
          getActions()
            .queryhandler(method, getStore().cLNameMod.cListName + "/")
            .then(({ status, data }) => {
              if (status === 200) {
                setStore({ contacts: data.contacts });
                console.log(data);
              } else {
                throw new Error(
                  "Network response was not ok, message: " + response.status
                );
              }
            })
            .then((data) => {
              setStore({ contacts: [data.contacts] });
              console.log(getStore().contacts);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      },

      queryhandler: (method, mod) => {
        const url = "https://playground.4geeks.com/contact/agendas/";
        const resquest = {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
        };
        console.log(url + mod);

        return fetch(url + mod, resquest).
        then((response) => {
          try {
            let requestStatus = response.status;
            return response.json().then((data) => {
              return { status: requestStatus, data: data };
            });
          } catch (error) {
            console.log(error.message);
          }
        });
      },
    },
  };
};

export default getState;
