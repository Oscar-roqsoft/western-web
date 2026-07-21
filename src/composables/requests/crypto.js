

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


export const fundUser = async (payload) => {
    const pinia = useStore();
    const url = `${baseURL}/balance/fund`;
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


export const getAdminWallet = async () => {

    const pinia = useStore();

    const url = `${baseURL}/adminWallet`;

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${pinia.state.user?.token}`
        }
    };

    return await asyncRequest(url, options);

};



export const createAdminWallet = async (payload) => {
    const pinia = useStore();
    const url = `${baseURL}/adminWallet/create`;
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


export const updateAdminWallet = async (payload) => {
    const pinia = useStore();
    const url = `${baseURL}/adminWallet/update`;
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




export const createDeposit = async (payload) => {
    const pinia = useStore();
    const url = `${baseURL}/deposit/create`;
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

export const  approveDeposit = async (id) => {
    const pinia = useStore();
    const url = `${baseURL}/deposit/approve/${id}`;
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${pinia.state.user?.token}`
        },
        // body: JSON.stringify(payload)
    };

    return await asyncRequest(url, options);
};

export const  rejectDeposit = async (id) => {
    const pinia = useStore();
    const url = `${baseURL}/deposit/reject/${id}`;
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${pinia.state.user?.token}`
        },
        // body: JSON.stringify(payload)
    };

    return await asyncRequest(url, options);
};


export const getAllDeposits = async () => {

    const pinia = useStore();

    const url = `${baseURL}/deposit`;

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${pinia.state.user?.token}`
        }
    };

    return await asyncRequest(url, options);

};



export const getUserTransactions = async () => {
    
    const pinia = useStore();

    const url = `${baseURL}/transaction/all`;

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${pinia.state.user?.token}`
        }
    };
    
    return await asyncRequest(url, options);

};
export const getUserAdminTransactions = async () => {
    
    const pinia = useStore();

    const url = `${baseURL}/transaction/admin/all`;

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${pinia.state.user?.token}`
        }
    };
    
    return await asyncRequest(url, options);

};

export const getWalletInfoByAdmin = async (pageNumber) => {
    
    const pinia = useStore();

    const url = `${baseURL}/wallet/all/${pageNumber}/limit=10`;

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${pinia.state.user?.token}`
        }
    };
    
    return await asyncRequest(url, options);

};
