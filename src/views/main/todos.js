import React, {useEffect, useState, useContext, Suspense} from 'react'
import useTodos from '../../services/useTodos'
import {AuthContext} from '../../context/auth'
import {NotificationContext} from '../../context/notification'
import {LoaderContext} from '../../context/loader'
import Button from '../../components/button'
const TodoCard = React.lazy(() => import('../../components/todos/card'))
const TodoComposer = React.lazy(() => import('../../components/todos/composer'))
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
              <Suspense fallback={<span></span>}>
                {todos.sort((a, b) => a.endsAt < b.endsAt).sort((a, b) => a.status > b.status).map((item, key) =>
                  <TodoCard item={item} key={key} handleSave={save} handleDrop={drop} toggleComposer={(pick) => {
                    toggleComposer(true);
                    setSelected(pick)
                  }} disabled={disabled} />
                )}
              </Suspense>
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
