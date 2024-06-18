import { Link } from "react-router-dom"

export const Button = ({id, href, action, title = "Button", btnStyle = "btn-dark" }) => {
    if(href==undefined){

    return (
        <button onClick={action} id={id} className={`btn ${btnStyle}`}>{title}</button>
    )
    }else{
        return (
            <Link to={href} className={`btn ${btnStyle}`}>{title}</Link>
        )
    }
}