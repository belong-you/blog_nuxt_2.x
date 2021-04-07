

export default function ({ $axios, redirect }) {
    // console.log($axios.defaults)
    // $axios.defaults.baseURL = 'http://10.0.25.104:5008/api',
    $axios.defaults.baseURL = 'http://note.bozai.tech/api/',
    // $axios.defaults.withCredentials = true;
    $axios.interceptors.response.use(response => {
        if (response?.status == 200) {
            return response.data;
        } else {
            // ...
        }
    })
    $axios.onError(error => {
        if (error.response?.status === 500) {
            redirect('/sorry')
        }
    })
}