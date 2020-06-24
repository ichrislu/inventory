import { BaseUrl } from './config'
import axios from 'axios'

export const loginApi = params => {
	return axios.post('/mk_login')
}

// export const loginApi = params => {
// 	return axios.get('/api', params)
// }
