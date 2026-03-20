

export const getWalletAddress = async (payload) => {
    
    const pinia = useStore();

    const url = `${baseURL}/wallet/${payload}`;

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${pinia.state.user?.token}`
        }
    };
    
    return await asyncRequest(url, options);

};


export const getCryptoPrices = async () => {

    const pinia = useStore();

    const url = `${baseURL}/crypto/prices`;

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${pinia.state.user?.token}`
        }
    };

    return await asyncRequest(url, options);

};


export const getCryptoBal = async () => {

    const pinia = useStore();

    const url = `${baseURL}/balance/all`;

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${pinia.state.user?.token}`
        }
    };

    return await asyncRequest(url, options);

};


export const calGasFee = async (payload) => {
    const pinia = useStore();
    const url = `${baseURL}/balance/cal`;
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


export const sendCoin = async (payload) => {
    const pinia = useStore();
    const url = `${baseURL}/balance/send`;
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


export const swapCoin = async (payload) => {
    const pinia = useStore();
    const url = `${baseURL}/balance/swap`;
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

export const importWalletAPI = async (payload) => {
    const pinia = useStore();
    const url = `${baseURL}/wallet/import`;
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


export const getWalletInfo = async () => {

    const pinia = useStore();

    const url = `${baseURL}/wallet`;

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${pinia.state.user?.token}`
        }
    };

    return await asyncRequest(url, options);

};