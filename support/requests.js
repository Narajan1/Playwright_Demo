export const performRequest = async (method, url, data, apiKey) => {

    const options = {
        method: method,
        headers: {
            'X-Challenger': apiKey
        },
        body : JSON.stringify(data)
    };

    // if (data) {
    //     options.body = JSON.stringify(data);
    // }

    return await fetch(url, options);
}

export const getApiKey = async (method, url) => {

    const options = {
        method: method,

    };

    return await fetch(url, options);
}
  