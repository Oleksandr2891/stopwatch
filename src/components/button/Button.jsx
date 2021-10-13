import css from "./Button.module.css";

const Button = ({ onHandleClick, nameButton, btnColor }) => {
  return (
    <>
      <button type="button" className={css[btnColor]} onClick={onHandleClick}>
        <span>{nameButton}</span>
      </button>
    </>
  );
};

export default Button;
