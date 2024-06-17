import axios from "axios"

// const BASE_URL = import.meta.env.VITE_BASE_URL
const BASE_URL = '/api'

export default axios.create({
    baseURL: BASE_URL,
})