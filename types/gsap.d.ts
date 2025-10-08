declare module 'gsap' {
  export const gsap: any // named export
}

declare module 'gsap/ScrollTrigger' {
  import { Plugin } from 'gsap'
  export const ScrollTrigger: Plugin // named export
}
