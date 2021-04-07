

export default function ({ $axios, redirect }) {
    // console.log($axios.defaults)
    // if (process.env.NODE_ENV === 'development') {
    //     $axios.defaults.baseURL = 'http://127.0.0.1:5008/api';
    // } else {
    //     $axios.defaults.baseURL = 'http://note.bozai.tech/api';
    // }
    $axios.defaults.baseURL = 'http://note.bozai.tech/api';
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