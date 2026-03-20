export const getMyUserCard = async () => {

    const pinia = useStore();

    const url = `${baseURL}/card/my`;

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${pinia.state.user?.token}`
        }
    };

    return await asyncRequest(url, options);

};


export const requestCard = async (payload) => {
    const pinia = useStore();
    const url = `${baseURL}/card/request`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${pinia.state.user?.token}`
        },
        body: JSON.stringify(payload)
    };

    return await asyncRequest(url, options);
};

export const approveCard = async (payload) => {
    const pinia = useStore();
    const url = `${baseURL}/card/approve`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${pinia.state.user?.token}`
        },
        body: JSON.stringify(payload)
    };

    return await asyncRequest(url, options);
};


export const fundCard = async (payload) => {
    const pinia = useStore();
    const url = `${baseURL}/card/fund`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${pinia.state.user?.token}`
        },
        body: JSON.stringify(payload)
    };

    return await asyncRequest(url, options);
};