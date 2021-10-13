import css from "./Watch.module.css";

const Watch = ({ valueOfTime }) => {
  return (
    <>
      <div className={css.timer}>
        <p className={css.time}>
          {new Date(valueOfTime).toISOString().slice(11, 19)}
        </p>
      </div>
    </>
  );
};

export default Watch;
