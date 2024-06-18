import "./style.css"

export const Badge = ({bgColor = "bg-danger",}) => {
    return (
        <span className={`position-absolute p-2 border-light rounded-circle ${bgColor}`}/>
    );
}