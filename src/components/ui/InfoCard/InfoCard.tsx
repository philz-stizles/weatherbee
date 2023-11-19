import classes from './InfoCard.module.css';

type Props = {
  title: string;
  value: string;
  meta?: string;
};

const InfoCard = ({ title, value, meta }: Props) => {
  return (
    <div className={classes['info-card']}>
      <h4>{title}</h4>
      <p className={classes.value}>{value}</p>
      <small>{meta}</small>
    </div>
  );
};

export default InfoCard;
