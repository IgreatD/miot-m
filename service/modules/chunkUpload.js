export const uploadBlock=(requestny, upfile) =>{
  return this.http.post(MicroServiceType.File + '/file/chunk/upload', upfile, {
    params: { ...request }, headers: {
      'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryQ0LhDBgwYpbyHqeu'
    }
  })
}

export const md5Verify=(md5) =>{
  return this.http.post(MicroServiceType.File + '/file/check', undefined, { params: { md5 } })
}

export const mergeFile=(mergeRequest)=> {
  return this.http.post(MicroServiceType.File + '/file/merge', mergeRequest)
}