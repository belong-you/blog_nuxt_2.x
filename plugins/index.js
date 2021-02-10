

export default function ({ $axios, redirect }) {
    // console.log($axios.defaults)
    $axios.defaults.baseURL = 'http://192.168.1.80:5008/api',
    // $axios.defaults.baseURL = 'http://bozai.tech/api/',
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