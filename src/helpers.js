export function storage(action, key, data = null) {
  const set = (key, data) => {
    if (data) {
      return localStorage.setItem(key, JSON.stringify(data))
    } else {
      return null
    }
  }
  const get = (key) => {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch {
      return null
    }
  }
  const remove = (key) => {
    return localStorage.removeItem(key)
  }
  switch (action) {
    case 'set':
      return set(key, data)
      break;
    case 'get':
      return get(key)
      break;
    case 'remove':
      return remove(key)
      break;
    default:
      break;
  }
}
