import { Promise } from "core-js"
const URL = "/banner"


export const getBanner = function(type){
  return this.axios.get(`${URL}?type=${type}`)
  .then((res)=>{
    return Promise.resolve(res.data)
  })
}