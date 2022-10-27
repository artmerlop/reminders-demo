import React, {useEffect, useState, useContext} from 'react'
import moment from 'moment'
import {NotificationContext} from '../../context/notification'
import Button from '../button'
import {TextInput, DateInput, TextArea} from '../form'
function TodoComposer({onSubmit = null, onDrop = null, data = {}, active = false, toggle = null}) {
  const notification = useContext(NotificationContext)
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState(data.id ? data.id : '')
  const [title, setTitle] = useState(data.title ? data.title : '')
  const [description, setDescription] = useState(data.description ? data.description : '')
  const [status, setStatus] = useState(data.status ? data.status : 0)
  const [date, setDate] = useState(data.endsAt ? moment(data.endsAt).format('DD/MM/YYYY') : '')
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    let data = {id: id, title: title, description: description, status: status}
    if (!status) {
      if (!date) {
        notification.emit(`Debes agregar una fecha para continuar.`, 'danger')
        return
      }
      data.completedAt = null
      data.endsAt = moment(date, 'YYYY-MM-DD')
      if (!data.endsAt.isValid()) {
        notification.emit(`Debes ingresar una fecha valida.`, 'danger')
        setLoading(false)
        return
      }
      if (data.endsAt < moment()) {
        notification.emit(`La fecha no puede ser anterior al día de hoy.`, 'danger')
        setLoading(false)
        return
      }
    }
    if (!onSubmit) {
      return
    } else if (!title) {
      notification.emit(`Debes agregar un titulo para continuar.`, 'danger')
      setLoading(false)
      return
    }
    onSubmit(data)
    setLoading(false)
    toggle()
  }
  useEffect(() => {
    setId(data.id ? data.id : '')
    setTitle(data.title ? data.title : '')
    setDescription(data.description ? data.description : '')
    setDate(data.endsAt ? moment(data.endsAt, 'YYYY-MM-DD').format('YYYY-MM-DD') : '')
    setStatus(data.status ? data.status : '')
  }, [data])
  return (
    <div id="composer" className={`${active ? 'active' : ''}`}>
      <div className="container">
        <div className="content">
          <form>
            <div className="form-group">
              <TextInput placeholder="Titulo" id="title" value={title}
                onChange={(e) => setTitle(e.target.value)} maxLength={64} disabled={status} />
            </div>
            <div className="form-group">
              <DateInput placeholder="Fecha (DD/MM/AAAA)" id="date" value={date} type="date"
                onChange={(e) => setDate(e.target.value)} disabled={status} />
            </div>
            <div className="form-group">
              <TextArea placeholder="Descripción" id="description" value={description}
                onChange={(e) => setDescription(e.target.value)} maxLength={256} disabled={status} />
            </div>
          </form>
          <div className="actions text-right">
            {onSubmit ?
              <Button type="button" className="success" label="Guardar" icon="save" onClick={handleSubmit} loading={loading} />
            : null}
            {id && onDrop ?
              <Button type="button" className="danger" label="Eliminar" icon="trash" />
            : null}
            <Button onClick={toggle} type="button" className="border" label="Cancelar" icon="times" />
          </div>
        </div>
      </div>
    </div>
  )
}
export default TodoComposer
