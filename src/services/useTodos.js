import React, {useEffect, useState, useContext} from 'react';
import {NotificationContext} from '../context/notification';
import axios from 'axios';
const endpoint = 'https://633935db937ea77bfdc7c4ee.mockapi.io/api';
export default function useTodos() {
  const notification = useContext(NotificationContext);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [droping, setDroping] = useState(false);
  const save = async (data = []) => {
    setSaving(data.id ? data.id : true)
    try {
      if (!data.id) {
        await axios.post(`${endpoint}/todos`, data);
        notification.emit('La actividad se ha creado correctamente.', 'success');
      } else {
        await axios.put(`${endpoint}/todos/${data.id}`, data);
        notification.emit('La actividad se ha actualizado correctamente.', 'success');
      }
      setSaving(false)
      refreshTodos()
    } catch (error) {
      setSaving(false)
      setError(error.message)
    }
  }
  const drop = async (id) => {
    setDroping(true)
    try {
      await axios.delete(`${endpoint}/todos/${id}`);
      notification.emit('La actividad se ha eliminado correctamente.', 'success');
      setDroping(false)
      refreshTodos()
    } catch (error) {
      setDroping(false)
      setError(error.message)
    }
  }
  const refreshTodos = async () => {
    setLoading(true)
    try {
      const request = await axios(`${endpoint}/todos`);
      setData(request.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }
  useEffect(() => {
    refreshTodos()
  }, []);
  return [data, loading, error, save, saving, drop, droping];
};
