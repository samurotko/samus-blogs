import axios from 'axios'
import baseUrl from '../config'


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}


export default { getAll }