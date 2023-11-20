import { InputHTMLAttributes, forwardRef } from 'react';
import classes from './Search.module.css'
import { IoSearch } from 'react-icons/io5';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const Search = forwardRef<HTMLInputElement, Props>(
  ({ label, id, ...props }: Props, ref) => {

    const inputId =
      id ??
      (label && typeof label === 'string'
        ? label.replace(' ', '-').toLowerCase()
        : undefined); 

    return (
      <div className={classes.search}>
        {label && <label htmlFor={inputId}>{label}</label>}
        <div className={classes.input}>
          <IoSearch />
          <input id={inputId} {...props} ref={ref} type="search" />
        </div>
      </div>
    );
  }
);

export default Search;
