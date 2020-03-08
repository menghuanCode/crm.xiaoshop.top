import axios from '../plugins/axios'

export function upload(file) {
  const formData = new FormData()
  formData.append('file', file)
  console.log(formData, file)
  return axios({
    url: '/zhai/upload',
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'post',
    data: formData
  })
}
