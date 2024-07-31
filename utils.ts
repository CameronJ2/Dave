export const wait = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const throttleActiveInstances = async (
  cb: (...args: unknown[]) => unknown,
  maxInstances: number
) => {
  let instances = 0

  return (...args: unknown[]) => {
    instances += 1

    // Some logic to wait until instances < maxInstances

    cb(...args)
  }
}

// export const throttle = async (cb: (...args: unknown[]) => unknown , ms: number) => {
//   let lastCalled = Date.now()

//   return (...args: unknown[]) => {
//     if (Date.now() - lastCalled < ms) {
//       return
//     }

//     lastCalled = Date.now()

//     // Some logic to wait until instances < maxInstances

//     cb(...args)
//   }
// }
