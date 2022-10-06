import moment from 'moment';
export function TextInput({id = '', type = 'text', value = '', onChange = null, placeholder = '', className = '', maxLength = 256,
  disabled = false}) {
  return (
    <input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} className={className}
      maxLength={maxLength} disabled={disabled} />
  )
}
export function DateInput({id = '', type = 'text', value = '', onChange = null, placeholder = '', className = '',
  disabled = false}) {
  const maskDate = (value) => {
    let v = value.replace(/\D/g,'').slice(0, 10);
    if (v.length >= 5) {
      return `${v.slice(0,2)}/${v.slice(2,4)}/${v.slice(4)}`;
    } else if (v.length >= 3) {
      return `${v.slice(0,2)}/${v.slice(2)}`;
    }
    return v;
  }
  const handleChange = (e) => {
    return onChange(e);
  }
  const handleChangeDisabled = (e) => {
    if (!onChange) {
      return;
    }
    let value = maskDate(e.target.value);
    e.target.value = value;
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
