export const Details = ({name,text = "Text"}) => {
    return(
        <p class="card-text m-0">{name?`${name}: `:""}{text}</p>
    )
}