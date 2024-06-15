export const Button = ({action, title = "Button", btnStyle = "btn-dark" }) => {
    return (
        <button onClick={action} className={`btn ${btnStyle}`}>{title}</button>
    );
}