import { TextareaHTMLAttributes } from 'react';
import classes from './TextArea.module.css';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

const TextArea = ({ id, rows = 4, label, ...props }: Props) => {
  const inputId =
    id ??
    (label && typeof label === 'string'
      ? label.replace(' ', '-').toLowerCase()
      : undefined);
  return (
    <div className={classes.textarea}>
      {label && <label htmlFor={inputId}>{label}</label>}
      <textarea id={inputId} rows={rows} {...props} />
    </div>
  );
};

export default TextArea;
