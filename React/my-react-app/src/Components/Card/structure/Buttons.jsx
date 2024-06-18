export const Buttons = ({clas,children}) => {
    return (
        <div className={`d-grid gap-2 mt-2 ${clas}`}>
            {children}
        </div>
    );
}