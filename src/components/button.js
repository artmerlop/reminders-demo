import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
export default function Button({label = '', onClick = null, className = '', type='button', icon = null,
  iconPrefix = 'fas', loading = false, disabled = false}) {
  return (
    <button onClick={onClick} className={`btn ${className} ${loading ? 'loading' : ''}
      ${(icon || loading) && label ? 'dual' : ''}`} type={type} disabled={loading || disabled}>
      {loading || icon ?
        <FontAwesomeIcon icon={[!loading ? iconPrefix : 'fas', !loading ? icon : 'spinner']} spin={loading} />
      : null}
      {label ?
        <span>{label}</span>
      : null}
    </button>
  )
}
