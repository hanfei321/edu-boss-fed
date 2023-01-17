import request from "@/utils/request";
import qs from 'qs'

//分页请求列表
export function getResourcePages(data: any) {

  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })

}
// 查询资源分类列表
export const getResourceCategories = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}
// 保存或更新资源分类
export const saveOrderUpdate = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/category/saveOrderUpdate',
    data
  })
}
//  保存或者更新资源
export const saveOrUpdate = (data: any) => {
  debugger
  return request({
    method: 'POST',
    url: '/boss/resource/saveOrUpdate',
    data
  })
}