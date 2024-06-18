export const Td = ({id,colspan, clas = "", title,children}) => {
    return(
        <td colspan={colspan} className={`table-td ${clas}`} id={`id${id}`}>
            {children}
            {title?title:null}
        </td>
    )
}