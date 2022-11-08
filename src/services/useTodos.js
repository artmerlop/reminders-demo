import {useQuery, useQueryClient, useMutation} from 'react-query'
import {useNotification} from '../context/notification'
import axios from 'axios'
const endpoint = 'https://633935db937ea77bfdc7c4ee.mockapi.io/api'
export default function useTodos() {
  const notification = useNotification()
  const queryClient = useQueryClient()
  const fetchTodos = async () => {
    return axios.get(`${endpoint}/todos`).then(res => res.data)
  }
  const todos = useQuery('todos', fetchTodos, {
    //refreshInterval: 60000
  })
  const postTodo = async (data = {}) => {
    if (!data.id) {
      return axios.post(`${endpoint}/todos`, data)
    } else {
      return axios.put(`${endpoint}/todos/${data.id}`, data)
    }
  }
  const dropTodo = async (id = null) => {
    return axios.delete(`${endpoint}/todos/${id}`)
  }
  const saveMutation = useMutation((data) => postTodo(data), {
    onMutate: (values) => {
      queryClient.cancelQueries('todos')
      const oldData = queryClient.getQueryData('todos')
      queryClient.setQueryData('todos', (update) => {
        const index = update.findIndex(item => item.id === values.id)
        if (index !== -1) {
          update.splice(index, 1, values)
        } else {
          update.push(values)
        }
        return update
      })
      return () => queryClient.setQueryData('todos', oldData)
    },
    onSuccess: () => {
      notification.emit(`La actividad se ha guardado correctamente.`, 'success')
      queryClient.invalidateQueries('todos')
    },
    onError: (error, values, rollback) => {
      if (rollback) {
        rollback()
      }
    }
  })
  const dropMutation = useMutation((data) => dropTodo(data), {
    onMutate: (id) => {
      queryClient.cancelQueries('todos')
      const oldData = queryClient.getQueryData('todos')
      queryClient.setQueryData('todos', (update) => {
        const index = update.findIndex(item => item.id === id)
        if (index !== -1) {
          update.splice(index, 1)
        }
        return update
      })
      return () => queryClient.setQueryData('todos', oldData)
    },
    onSuccess: () => {
      notification.emit('La actividad se ha eliminado correctamente.', 'success')
      queryClient.invalidateQueries('todos')
    },
    onError: (error, values, rollback) => {
      if (rollback) {
        rollback()
      }
    }
  })
  const actions = {save: saveMutation.mutate, drop: dropMutation.mutate,
    saving: saveMutation.isLoading, droping: dropMutation.isLoading}
  return {todos, actions}
}
