import moment from 'moment'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Button from '../button'
function TodoCard({item, toggleComposer, handleSave, handleDrop, disabled}) {
  return (
    <div className="item">
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
              handleSave(item)
            }} className={`${item.status ? 'success' : 'border'} large`} disabled={disabled}
            label={item.status ? 'Completado' : 'Completar'} icon="circle" iconPrefix={item.status ? 'fas' : 'far'} />
        </div>
        <div className="actions">
          <Button onClick={() => toggleComposer(item)} className="reference" icon="edit" disabled={disabled} />
          <Button onClick={() => handleDrop(item.id)} className="danger" icon="trash" disabled={disabled} />
        </div>
      </div>
    </div>
  )
}
export default TodoCard
