import {useReducer} from 'react'
import {useQuery, useQueryClient} from 'react-query'
import {useNotification} from '../context/notification'
import axios from 'axios'
const endpoint = 'https://633935db937ea77bfdc7c4ee.mockapi.io/api'
export default function useTodos() {
  const notification = useNotification()
  const queryClient = useQueryClient()
  const todos = useQuery('todos', async () => {
    return axios.get(`${endpoint}/todos`).then(res => res.data)
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
      queryClient.invalidateQueries('todos')
    } catch (error) {
      console.log(error.message)
      dispatch({saving: false, error: error.message})
    }
  }
  const drop = async (id) => {
    dispatch({droping: true})
    try {
      await axios.delete(`${endpoint}/todos/${id}`)
      notification.emit('La actividad se ha eliminado correctamente.', 'success')
      dispatch({droping: false})
      queryClient.invalidateQueries('todos')
    } catch (error) {
      dispatch({droping: false, error: error.message})
    }
  }
  const [state, dispatch] = useReducer((prevState, newState) => ({...prevState, ...newState}), {
    saving: false, droping: false, error: null
  })
  const actions = {...state, save, drop}
  return {todos, actions}
}
