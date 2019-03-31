import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://subway-builder.firebaseio.com/'
})

export default instance
