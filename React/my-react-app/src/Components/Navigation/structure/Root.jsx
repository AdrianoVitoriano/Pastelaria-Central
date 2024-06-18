export const Root = ({title, children }) => {
    return (
        <div className="navigation fixed-start" id={`navigation${title}`} onClick={()=>{}}>
                {children}
        </div>
        
    );
}