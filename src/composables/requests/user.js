// export const pinia = useStore()

export const updateUser = async (payload) => {
    const pinia = useStore();
    const url = `${baseURL}/user/update`;
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${pinia.state.user?.token}`
        },
        body: JSON.stringify(payload)
    };

    return await asyncRequest(url, options);
};

export const approveKYC = async (id) => {
    const pinia = useStore();
  
    return await asyncRequest(
      `${baseURL}/user/${id}/approve-kyc`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${pinia.state.user.token}`,
        },
      }
    );
  };
  
  export const rejectKYC = async (id, reason) => {
    const pinia = useStore();
  
    return await asyncRequest(
      `${baseURL}/user/${id}/reject-kyc`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${pinia.state.user.token}`,
        },
        body: JSON.stringify({ reason }),
      }
    );
  };

export const updateUserPassword = async (payload) => {
    const pinia = useStore();
    const url = `${baseURL}/user/updateUserPassword`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${pinia.state.user?.token}`
        },
        body: JSON.stringify(payload)
    };

    return await asyncRequest(url, options);
};


export const getAllUsers = async () => {

    const pinia = useStore();

    const url = `${baseURL}/user/getUser`;

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${pinia.state.user?.token}`
        }
    };

    return await asyncRequest(url, options);

};



