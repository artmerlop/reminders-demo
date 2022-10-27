import React, {useEffect, useCallback, useState, useRef, useContext, Suspense} from 'react'
import moment from 'moment'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import useTodos from '../../services/useTodos'
import {AuthContext} from '../../context/auth'
import {NotificationContext} from '../../context/notification'
import {LoaderContext} from '../../context/loader'
import Button from '../../components/button'
import {TextInput, DateInput, TextArea} from '../../components/form'
const TodoComposer = React.lazy(() => import('../../components/todoComposer'))
export default function TodosScene() {
  const session = useContext(AuthContext)
  const notification = useContext(NotificationContext)
  const loader = useContext(LoaderContext)
  const [showComposer, toggleComposer] = useState(false)
  const [selected, setSelected] = useState({})
  const [state, save, drop] = useTodos()
  const {data: todos, saving, loading, error, droping} = state
  const disabled = loading || saving || droping
  useEffect(() => {
    if (loading || saving || droping) {
      loader.emit(true)
    } else {
      loader.emit(false)
    }
  }, [state])
  useEffect(() => {
    if (session.user) {
      notification.emit(`¡Hola @${session.user.name}!`, 'welcome')
    }
  }, [session])
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
                      <Button onClick={() => {toggleComposer(true); setSelected(item)}} className="reference" icon="edit" disabled={disabled} />
                      <Button onClick={() => drop(item.id)} className="danger" icon="trash" disabled={disabled} />
                    </div>
                  </div>
                </div>
              )}
              <div className="item">
                <div className="container">
                  <div className="content">
                    <Button onClick={() => toggleComposer(true)} className="border cover" icon="plus-circle" disabled={disabled} />
                  </div>
                </div>
              </div>
            </div>
          :
            <div className="message">
              <p>Aún no hay nada para mostrar.</p>
              <Button onClick={() => toggleComposer(true)} className="reference" label="Crear actividad" icon="plus-circle" disabled={disabled} />
            </div>
          }
        </div>
      </div>
      <Suspense fallback={<span></span>}>
        {showComposer ?
          <TodoComposer onSubmit={save} active={showComposer} data={selected} toggle={() => {
              setSelected({})
              toggleComposer(false)
            }} />
        : null}
      </Suspense>
    </React.Fragment>
  )
}
