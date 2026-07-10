export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
  
    if (process.client) {
      const w = window as any
  
      w._smartsupp = w._smartsupp || {}
      w._smartsupp.key = config.public.smartsuppKey
  
      if (!w.smartsupp) {
        const o: any = function () {
          o._.push(arguments)
        }
        o._ = []
  
        w.smartsupp = o
  
        const s = document.getElementsByTagName("script")[0]
        const c = document.createElement("script")
  
        c.type = "text/javascript"
        c.charset = "utf-8"
        c.async = true
        c.src = "https://www.smartsuppchat.com/loader.js"
  
        s.parentNode?.insertBefore(c, s)
      }
    }
  })