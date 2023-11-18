import { InputHTMLAttributes, forwardRef } from 'react';
import classes from './Search.module.css'
import { IoSearch } from 'react-icons/io5';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const Search = forwardRef<HTMLInputElement, Props>(
  ({ label, ...props }: Props, ref) => {
    return (
      <div className={classes.search}>
        {label && <label>{label}</label>}
        <div className={classes.input}>
          <IoSearch />
          <input {...props} ref={ref} type="search" placeholder="Search" />
        </div>
      </div>
    );
  }
);

export default Search;
