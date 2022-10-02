export function TextInput({id = '', type = 'text', value = '', onChange = null, placeholder = '', className = ''}) {
  return (
    <input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} className={className} />
  )
}
export function TextArea({id = '', value = '', onChange = null, placeholder = '', className = ''}) {
  return (
    <textarea id={id} onChange={onChange} value={value} placeholder={placeholder} className={className}></textarea>
  )
}
