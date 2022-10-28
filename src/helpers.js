export function storage(action, key, data = null, index = 0) {
  const set = () => {
    if (data) {
      localStorage.setItem(key, JSON.stringify(data))
      return data
    } else {
      return null
    }
  }
  const get = () => {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch {
      return null
    }
  }
  const push = () => {
    try {
      let array = localStorage.getItem(key), result
      if (!array) {
        result = [data]
      } else {
        result = JSON.parse(array)
        if (!Array.isArray(result)) {
          throw new Error(`Key "${key}" is not an array so we can't push this item.`)
        }
        if (result.length > 0) {
          const origin = [...result]
          for (var i = 0; i < origin.length; i++) {
            if (i === index) {
              result[i] = data
              result[i+1] = origin[i]
            } else if (i > index) {
              result[i+1] = origin[i]
            }
          }
        } else {
          result = [data]
        }
      }
      localStorage.setItem(key, JSON.stringify(result))
      return {error: null, data: result}
    } catch (error) {
      return {error: error.message, data: null}
    }
  }
  const splice = () => {
    try {
      let array = localStorage.getItem(key), result
      if (!array) {
        throw new Error(`Key "${key}" is empty.`)
      } else {
        let idx = index
        if (!idx && idx !== 0) {
          idx = array.findIndex(item => item === data)
        }
        if (!array[idx]) {
          throw new Error(`Index "${idx}" does not exist.`)
        }
        result = JSON.parse(array)
        if (!Array.isArray(result)) {
          throw new Error(`Key "${key}" is not an array so we can't push this item.`)
        }
        result.splice(idx, 1)
      }
      localStorage.setItem(key, JSON.stringify(result))
      return {error: null, data: result}
    } catch (error) {
      return {error: error.message, data: null}
    }
  }
  const remove = () => {
    return localStorage.removeItem(key)
  }
  switch (action) {
    case 'set':
      return set()
    case 'get':
      return get()
    case 'push':
      return push()
    case 'splice':
      return splice()
    case 'remove':
      return remove()
    default:
      throw new Error('Invalid action, you can use "set", "get", "push", "splice" or "remove".')
  }
}
