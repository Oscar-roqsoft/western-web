/* =========================
   CREATE WITHDRAWAL
========================= */

export const createWithdrawal = async (payload) => {
    const pinia = useStore();

    const url = `${baseURL}/withdrawal/create`;

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${pinia.state.user?.token}`
        },
        body: JSON.stringify(payload)
    };

    return await asyncRequest(url, options);
};


/* =========================
   USER WITHDRAWALS
========================= */

export const getUserWithdrawals = async () => {
    const pinia = useStore();

    const url = `${baseURL}/withdrawal/my`;

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${pinia.state.user?.token}`
        }
    };

    return await asyncRequest(url, options);
};


/* =========================
   ADMIN GET ALL
========================= */

export const getAllWithdrawals = async () => {
    const pinia = useStore();

    const url = `${baseURL}/withdrawal/all`;

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${pinia.state.user?.token}`
        }
    };

    return await asyncRequest(url, options);
};


/* =========================
   APPROVE WITHDRAWAL
========================= */

export const approveWithdrawal = async (id) => {
    const pinia = useStore();

    const url = `${baseURL}/withdrawal/approve/${id}`;

    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${pinia.state.user?.token}`
        }
    };

    return await asyncRequest(url, options);
};


/* =========================
   REJECT WITHDRAWAL
========================= */

export const rejectWithdrawal = async (id) => {
    const pinia = useStore();

    const url = `${baseURL}/withdrawal/reject/${id}`;

    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${pinia.state.user?.token}`
        }
    };

    return await asyncRequest(url, options);
};