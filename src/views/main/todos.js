import React, {useEffect, useState, Suspense} from 'react'
import useTodos from '../../services/useTodos'
import {useAuth} from '../../context/auth'
import {useNotification} from '../../context/notification'
import {useLoader} from '../../context/loader'
import Button from '../../components/button'
const TodoCard = React.lazy(() => import('../../components/todos/card'))
const TodoComposer = React.lazy(() => import('../../components/todos/composer'))
export default function TodosScene() {
  const session = useAuth()
  const notification = useNotification()
  const loader = useLoader()
  const [showComposer, toggleComposer] = useState(false)
  const [selected, setSelected] = useState({})
  const {todos, actions} = useTodos()
  const {save, drop, saving, droping} = actions
  const disabled = todos.isFetching || saving || droping
  useEffect(() => {
    loader.emit(todos.isFetching)
  }, [todos.isFetching])
  useEffect(() => {
    if (session.user) {
      notification.emit(`¡Hola @${session.user.name}!`, 'welcome')
    }
  }, [session])
  return (
    <React.Fragment>
      <div className="container">
        <div className="content">
          {todos.data?.length > 0 ?
            <div className="grid col-4 cards">
              <Suspense fallback={<span></span>}>
                {todos.data.sort((a, b) => a.endsAt < b.endsAt).sort((a, b) => a.status > b.status).map((item, key) =>
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
