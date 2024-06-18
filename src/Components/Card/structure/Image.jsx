import "./style.css"

export const Image = ({ src = "./public/img-not-founded.jpg", alt }) => {
    return (
        <img src={src} alt={alt} className="img-fluid img-card-size" />
    );
}