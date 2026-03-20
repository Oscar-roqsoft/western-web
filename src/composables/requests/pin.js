import { baseURL } from "@/composables/configs";

export const createPin = async (payload) => {
    const pinia = useStore();
    const url = `${baseURL}/pin/create`;
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

export const updatePin = async (payload) => {
    const pinia = useStore();
    const url = `${baseURL}/pin/update`;
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


export const verifyPin = async (payload) => {
    const pinia = useStore();
    const url = `${baseURL}/pin/verify`;
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