import { InputHTMLAttributes } from 'react';
import classes from './TextArea.module.css';

type Props = InputHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

const TextArea = ({ label, ...props }: Props) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <textarea className={classes.textarea} {...props} />
    </div>
  );
};

export default TextArea;
