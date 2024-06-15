export const Root = ({title, children }) => {
    return (
        <div className="navigation" id={`navigation${title}`} onClick={()=>{}}>
                {children}
        </div>
        
    );
}