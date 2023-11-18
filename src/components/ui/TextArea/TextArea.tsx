import { InputHTMLAttributes } from 'react';
import classes from './TextArea.module.css';

type Props = InputHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

const TextArea = ({ label, ...props }: Props) => {
  return (
    <div className={classes.textarea}>
      {label && <label>{label}</label>}
      <textarea {...props} />
    </div>
  );
};

export default TextArea;
