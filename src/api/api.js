import axios from 'axios'

export const requestSeller = params => {
  return axios.get(`/api/seller`, params).then(res => res.data)
}

export const requestGoods = params => {
  return axios.get(`/api/goods`, params).then(res => res.data)
}


export const requestRatings = params => {
  return axios.get(`/api/ratings`, params).then(res => res.data)
}