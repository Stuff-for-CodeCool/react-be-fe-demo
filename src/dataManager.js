const generalOptions = {
    headers: { "Content-Type": "application/json" },
    mode: "cors",
};

const dataManager = {
    get: async (url, callback) => {
        const request = await fetch(url, generalOptions);
        if (request.ok) {
            const response = await request.json();
            callback(response);
        } else {
            return "GET failed";
        }
    },
    post: async (url, callback, data) => {
        const opts = { ...generalOptions, body: data, method: "POST" };

        const request = await fetch(url, opts);
        if (request.ok) {
            const response = await request.json();
            callback(response);
        } else {
            return "POST failed";
        }
    },
    put: async (url, callback, data) => {
        const opts = { ...generalOptions, body: data, method: "PUT" };

        const request = await fetch(url, opts);
        if (request.ok) {
            const response = await request.json();
            callback(response);
        } else {
            return "PUT failed";
        }
    },
    delete: async (url, callback, data) => {
        const opts = { ...generalOptions, method: "DELETE" };

        const request = await fetch(url, opts);
        if (request.ok) {
            const response = await request.json();
            callback(response);
        } else {
            return "DELETE failed";
        }
    },
};

export default dataManager;
