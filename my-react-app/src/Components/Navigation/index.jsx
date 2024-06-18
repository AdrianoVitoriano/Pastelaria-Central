import { Navigation } from "./structure";
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
	return (
		<>
			<Navigation.Root title="Menu">
					<Navigation.LinkList>
						{Links.map((link) => {
							console.log(window.location.pathname)
							return (
								<Navigation.NavLink href={link.url} title={link.title} active={window.location.pathname.includes(link.url) || window.location.pathname === "/" && link.url === "/mesas"	 }>
									<ion-icon name={link.icon} size="large"></ion-icon>
								</Navigation.NavLink>
							);
						})}
					</Navigation.LinkList>
			</Navigation.Root>
		</>
	);
};
