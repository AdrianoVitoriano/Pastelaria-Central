export const Th = ({colspan, clas ="",title, children}) => {
    return(
        <th colspan={colspan} className={`${clas}`}>
            {children}
            {title}
        </th>
    )
}