export const dashboardCalls = {
  getAllUsers: async () =>
    await fetch("https://blue-journalist-bbrpv.ineuron.app:4000/users")
      .then((res) => res.json())
      .then((response) => {
        return response;
      }),
  createUser: async (payload: object) =>
    await fetch("https://blue-journalist-bbrpv.ineuron.app:4000/user/create", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        return response;
      }),
  editUser: async (payload: object, id: string) =>
    await fetch(`https://blue-journalist-bbrpv.ineuron.app:4000/user/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        accept: "application.json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        return response;
      }),
  deleteUser: async (id: string) =>
    await fetch(`https://blue-journalist-bbrpv.ineuron.app:4000/user/${id}`, {
      method: "DELETE",
      headers: {
        accept: "application.json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        return res;
      }),
};
