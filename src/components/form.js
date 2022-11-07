export function TextInput({id = '', type = 'text', value = '', onChange = null, placeholder = '', className = '', maxLength = 256,
  disabled = false}) {
  return (
    <input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} className={className}
      maxLength={maxLength} disabled={disabled} />
  )
}
export function DateInput({id = '', type = 'text', value = '', onChange = null, placeholder = '', className = '',
  disabled = false}) {
  const handleChange = (e) => {
    return onChange(e);
  }
  return (
    <input id={id} type={type} value={value} onChange={handleChange} placeholder={placeholder} className={className}
     maxLength={10} disabled={disabled} />
  )
}
export function TextArea({id = '', value = '', onChange = null, placeholder = '', className = '', maxLength = 1024,
  disabled = false}) {
  return (
    <textarea id={id} onChange={onChange} value={value} placeholder={placeholder} className={className}
      maxLength={maxLength} disabled={disabled}></textarea>
  )
}
