
export const sendNotification = async (payload) => {
    const pinia = useStore();
    const url = `${baseURL}/notification/send`;
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


export const getNotifications = async (pageNumber) => {
    
    const pinia = useStore();

    const url = `${baseURL}/notification/${pageNumber}`;

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${pinia.state.user?.token}`
        }
    };
    
    return await asyncRequest(url, options);

};

export const markAsRead = async (id) => {
    
    const pinia = useStore();

    const url = `${baseURL}/notification/${id}/read`;

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${pinia.state.user?.token}`
        }
    };
    
    return await asyncRequest(url, options);

};


export const markAllAsRead = async () => {
    
    const pinia = useStore();

    const url = `${baseURL}/notification/read-all`;

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${pinia.state.user?.token}`
        }
    };
    
    return await asyncRequest(url, options);

};