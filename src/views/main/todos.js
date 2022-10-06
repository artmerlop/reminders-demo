import React, {useEffect, useState, useContext} from 'react';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import useTodos from '../../services/useTodos';
import {AuthContext} from '../../context/auth';
import {NotificationContext} from '../../context/notification';
import {LoaderContext} from '../../context/loader';
import Button from '../../components/button';
import {TextInput, DateInput, TextArea} from '../../components/form';
function TodoComposer({onSubmit = null, onDrop = null, data = {}, active = false, toggle = null}) {
  const notification = useContext(NotificationContext);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(data.id ? data.id : '');
  const [title, setTitle] = useState(data.title ? data.title : '');
  const [description, setDescription] = useState(data.description ? data.description : '');
  const [status, setStatus] = useState(data.status ? data.status : 0);
  const [date, setDate] = useState(data.endsAt ? moment(data.endsAt).format('DD/MM/YYYY') : '');
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let data = {id: id, title: title, description: description, status: status}
    if (!status) {
      if (!date) {
        notification.emit(`Debes agregar una fecha para continuar.`, 'danger');
        return;
      }
      data.completedAt = null;
      data.endsAt = moment(date, 'YYYY-MM-DD');
      if (!data.endsAt.isValid()) {
        notification.emit(`Debes ingresar una fecha valida.`, 'danger');
        setLoading(false);
        return;
      }
      if (data.endsAt < moment()) {
        notification.emit(`La fecha no puede ser anterior al día de hoy.`, 'danger');
        setLoading(false);
        return;
      }
    }
    if (!onSubmit) {
      return;
    } else if (!title) {
      notification.emit(`Debes agregar un titulo para continuar.`, 'danger');
      setLoading(false);
      return;
    }
    onSubmit(data);
    setLoading(false);
    toggle();
  }
  useEffect(() => {
    setId(data.id ? data.id : '');
    setTitle(data.title ? data.title : '');
    setDescription(data.description ? data.description : '');
    setDate(data.endsAt ? moment(data.endsAt, 'YYYY-MM-DD').format('YYYY-MM-DD') : '');
    setStatus(data.status ? data.status : '');
  }, [data]);
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
export default function TodosScene() {
  const session = useContext(AuthContext);
  const notification = useContext(NotificationContext);
  const loader = useContext(LoaderContext);
  const [showComposer, setShowComposer] = useState(false)
  const [selected, setSelected] = useState({})
  const [todos, loading, error, save, saving, drop, droping] = useTodos();
  const disabled = loading || error !== null || saving || droping
  useEffect(() => {
    if (loading || saving || droping) {
      loader.emit(true);
    } else {
      loader.emit(false);
    }
  })
  useEffect(() => {
    if (session.user) {
      notification.emit(`¡Hola @${session.user.name}!`, 'welcome');
    }
  }, [session]);
  return (
    <React.Fragment>
      <div className="container">
        <div className="content">
          {todos.length > 0 ?
            <div className="grid col-4 cards">
              {todos.sort((a, b) => a.endsAt < b.endsAt).sort((a, b) => a.status > b.status).map((item, key) =>
                <div className="item" key={key}>
                  <div className="container">
                    <div className="content">
                      <h5>{item.title}</h5>
                      {item.description ?
                        <p>{item.description}</p>
                      : null}
                      {item.endsAt ?
                        <p className="caption tag dual">
                          <FontAwesomeIcon icon={['fas', 'calendar-day']} />
                          <span>{moment(item.endsAt).format('DD/MM/YYYY')}</span>
                        </p>
                      : null}
                      {item.completedAt ?
                        <p className="caption tag dual">
                          <FontAwesomeIcon icon={['fas', 'calendar-check']} />
                          <span>{moment(item.completedAt).format('DD/MM/YYYY')}</span>
                        </p>
                      : null}
                    </div>
                    <div className="status">
                      <Button onClick={() => {
                          item.status = !item.status
                          if (!item.status) {
                            item.completedAt = null
                          } else {
                            item.completedAt = moment()
                          }
                          save(item)
                        }} className={`${item.status ? 'success' : 'border'} large`} disabled={disabled}
                        label={item.status ? 'Completado' : 'Completar'} icon="circle" iconPrefix={item.status ? 'fas' : 'far'} />
                    </div>
                    <div className="actions">
                      <Button onClick={() => {setShowComposer(true); setSelected(item);}} className="reference" icon="edit" disabled={disabled} />
                      <Button onClick={() => drop(item.id)} className="danger" icon="trash" disabled={disabled} />
                    </div>
                  </div>
                </div>
              )}
              <div className="item">
                <div className="container">
                  <div className="content">
                    <Button onClick={() => setShowComposer(true)} className="border cover" icon="plus-circle" disabled={disabled} />
                  </div>
                </div>
              </div>
            </div>
          :
            <div className="message">
              <p>Aún no hay nada para mostrar.</p>
              <Button onClick={() => setShowComposer(true)} className="reference" label="Crear actividad" icon="plus-circle" disabled={disabled} />
            </div>
          }
        </div>
      </div>
      <TodoComposer onSubmit={save} active={showComposer} data={selected} toggle={() => {
          setSelected({});
          setShowComposer(false)
        }} />
    </React.Fragment>
  );
}
