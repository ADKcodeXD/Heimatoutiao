import axios from 'axios'


const ip = axios.get({
    url: "https://api.ipify.org/?format=json",
    dataType: "json"
})

export default ip;