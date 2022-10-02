import React, {useEffect, useState, useContext} from 'react';
import moment from 'moment';
import useTodos from '../../services/useTodos';
import {AuthContext} from '../../context/auth';
import {NotificationContext} from '../../context/notification';
import Button from '../../components/button';
import {TextInput, TextArea} from '../../components/form';
function TodoComposer({onSubmit = null, onDrop = null, data = {}, active = false, toggle = null}) {
  const [id, setId] = useState(data.id ? data.id : '');
  const [title, setTitle] = useState(data.title ? data.title : '');
  const [description, setDescription] = useState(data.description ? data.description : '');
  const [status, setStatus] = useState(data.status ? data.status : '');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!onSubmit) {
      return;
    }
    onSubmit({id: id, title: title, description: description, status: status});
    toggle();
  }
  useEffect(() => {
    setId(data.id ? data.id : '');
    setTitle(data.title ? data.title : '');
    setDescription(data.description ? data.description : '');
    setStatus(data.status ? data.status : '');
  }, [data]);
  return (
    <div id="composer" className={`${active ? 'active' : ''}`}>
      <div className="container">
        <div className="content">
          <form>
            <div className="form-group">
              <TextInput placeholder="Titulo" id="title" value={title}
                onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-group">
              <TextArea placeholder="Descripción" id="description" value={description}
                onChange={(e) => setDescription(e.target.value)} />
            </div>
          </form>
          <div className="actions text-right">
            {onSubmit ?
              <Button type="button" className="success" label="Guardar" icon="save" onClick={handleSubmit} />
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
  const [showComposer, setShowComposer] = useState(false)
  const [selected, setSelected] = useState({})
  const [todos, loading, error, save, saving, drop, droping] = useTodos();
  const disabled = loading || error !== null || saving || droping
  useEffect(() => {
    notification.emit(`¡Hola @${session.user.name}!`, 'welcome');
  }, [session]);
  return (
    <React.Fragment>
      <div className="container">
        <div className="content">
          {todos.length > 0 ?
            <div className="grid col-4 cards">
              {todos.sort((a, b) => a.status > b.status).map((item, key) =>
                <div className="item" key={key}>
                  <div className="container">
                    <div className="content">
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                    <div className="status">
                      <Button onClick={() => {
                          item.status = !item.status
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
