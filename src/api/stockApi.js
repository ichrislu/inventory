import axios from 'axios'

export const getList = params => { return axios.get('http://localhost/stock',{params : params}); }
