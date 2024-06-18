import { useLocation } from "react-router-dom";
import { Navigation } from "./structure";
import { useEffect, useState } from "react";
const Links = [
	{
		title: "Mesas",
		url: "/mesas",
		icon: "stopwatch-outline",
	},
	{
		title: "Itens",
		url: "/itens",
		icon: "fast-food-outline",
	},
	{
		title: "Categorias",
		url: "/categorias",
		icon: "file-tray-full-outline",
	},
	{
		title: "Pedidos",
		url: "/pedidos",
		icon: "cart-outline",
	},
	{
		title: "Comandas",
		url: "/comandas",
		icon: "document-text-outline",
	},
	{
		title: "Cozinha",
		url: "/cozinhas",
		icon: "pricetags-outline",
	},
];

export const Navigator = () => {
    const location = useLocation();
    const [url, setUrl] = useState(location.pathname);

    useEffect(() => {
        setUrl(location.pathname);
    }, [location]);

    return (
        <>
            <Navigation.Root title="Menu"> 
                <Navigation.LinkList>
                    {Links.map((link) => {
                        const isActive = url.includes(link.url) || (url === "/" && link.url === "/mesas");
                        return (
                            <Navigation.NavLink href={link.url} title={link.title} active={isActive}>
                                <ion-icon name={link.icon} size="large"></ion-icon>
                            </Navigation.NavLink>
                        );
                    })}
                </Navigation.LinkList>
            </Navigation.Root>
        </>
    );
};