import {useEffect, useCallback, useReducer} from 'react'
import {useNotification} from '../context/notification'
import axios from 'axios'
const endpoint = 'https://633935db937ea77bfdc7c4ee.mockapi.io/api'
export default function useTodos() {
  const notification = useNotification()
  const [state, dispatch] = useReducer((prevState, newState) => ({...prevState, ...newState}), {
    data: [], loading: false, saving: false, droping: false, error: null
  })
  const save = async (data = []) => {
    dispatch({saving: data.id ? data.id : true})
    try {
      if (!data.id) {
        await axios.post(`${endpoint}/todos`, data)
        notification.emit('La actividad se ha creado correctamente.', 'success')
      } else {
        await axios.put(`${endpoint}/todos/${data.id}`, data)
        notification.emit('La actividad se ha actualizado correctamente.', 'success')
      }
      dispatch({saving: false})
      refreshTodos()
    } catch (error) {
      dispatch({saving: false, error: error.message})
    }
  }
  const drop = async (id) => {
    dispatch({droping: true})
    try {
      await axios.delete(`${endpoint}/todos/${id}`)
      notification.emit('La actividad se ha eliminado correctamente.', 'success')
      dispatch({droping: false})
      refreshTodos()
    } catch (error) {
      dispatch({droping: false, error: error.message})
    }
  }
  const refreshTodos = useCallback(async () => {
    dispatch({loading: true})
    try {
      const request = await axios(`${endpoint}/todos`)
      dispatch({data: request.data, loading: false})
    } catch (error) {
      dispatch({error: error.message, loading: false})
    }
  })
  useEffect(() => {
    refreshTodos()
  }, [])
  return [state, save, drop]
}
