export async function callApi(url) {
    try {
        const response = await fetch(url);
        return response;
    } catch (e) {
        throw(e);
    }
}