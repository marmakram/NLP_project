import validateURL from './checkURL';

const post = async (data = {}, url = 'http://localhost:8081/getURLInfo') => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    try {
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

const handleSubmit = async (url) => {
    /**
     *  - Get Value of the input for URL
     *  - Check if it's URL or not
     *      yes
     *          send it to the backend
     *      no
     *          show user message it's not valid URL
     */
     try {
        if (validateURL(url)) {
            var resp = await post({ url });
            if(!resp) {
                return {
                    is_valid: false
                }
            }
            return {
                is_valid: true,
                response: resp
            }
        }
        return { is_valid: false };
    } catch (e) {
        return { is_valid: false };
    }
}

export default handleSubmit
