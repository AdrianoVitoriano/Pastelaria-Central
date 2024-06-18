export const Details = ({name,text = "Text"}) => {
    return(
        <p className="card-text m-0">{name?`${name}: `:""}{text}</p>
    )
}