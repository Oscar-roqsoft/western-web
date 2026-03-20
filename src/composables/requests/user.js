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



