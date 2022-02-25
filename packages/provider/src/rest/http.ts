import { request as requestHttp } from 'http'
import { request as requestHttps } from 'https'
import { URL } from 'url'

export const fetch = async (urlString: string) => {
  const url = new URL(urlString)
  const doRequest = url.protocol === 'https:' ? requestHttps : requestHttp
  return new Promise<string>((resolve, reject) => {
    const req = doRequest(url, (res) => {
      if (res === undefined || res.statusCode === undefined) {
        return reject(new Error(`Undefined response`))
      }
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error(`Status Code: ${res.statusCode}`))
      }
      const data: any = []
      res.on('data', (chunk) => {
        data.push(chunk)
      })
      res.on('end', () => resolve(Buffer.concat(data).toString()))
    })
    req.on('error', reject)
    req.end()
  })
}
