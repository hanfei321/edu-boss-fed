import request from "@/utils/request";
import qs from 'qs'
import Login from "@/store/Login";

export function saveOrUpdate(data: any) {

  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })

}

export function getEditMenuInfo(id: any = -1) {

  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    },
  })
}
export function getMenuAll() {

  return request({
    method: 'GET',
    url: '/boss/menu/getAll',
  })
}

export function getDeleteMenu(id: number) {

  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`,
  })
}
export function getMenuPages(data: any) {

  return request({
    method: 'POST',
    url: '/boss/menu/getMenuPages',
    data
  })
}