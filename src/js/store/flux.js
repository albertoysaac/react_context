const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      cLNameMod: "",
      contacts: [
        {
          name: "contacto 1",
          phone: "white",
          email: "white",
          address: "white",
          id: "1",
        },
      ],
    },
    actions: {
      deleteContact: (indexToDelete) => {
        const store = getStore();
        setStore({
          contacts: store.contacts.filter(
            (contact, index) => index != indexToDelete
          ),
        });
      },
      setCLNameMod: (clName) => {
        setStore({
          cLNameMod: clName + "/",
        });
      },

      clNameCheck: (clName) => {
        const method = "GET";
        getActions()
          .query(method, clName)
          .then((data) => {
            console.log(data);
            if (data.ok) {
              setStore({ cLNameMod: clName + "/" });
            }
            if (!data.ok) {
              setStore({ cLNameMod: "" });
            }
          });
      },
      myContacts: () => {
        const method = "GET";
        getActions()
          .query(method, getStore().cLNameMod)
          .then((data) => {
            if (data.ok) {
              console.log(data.json());
              setStore({
                contacts: data.json(),
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
      query: (method, mod) => {
        const url = "https://playground.4geeks.com/contact/agendas/";
        const resquest = {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
        };
        return fetch(url + mod, resquest).then((response) => {
          return response;
        });
      },
    },
  };
};

export default getState;
