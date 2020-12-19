package Controllers;

import static Utils.JsonUtil.*;
import static spark.Spark.*;

import Services.ShopItemService;

public class ShopItemController {
	//este metodo enviara una señal para recuperar los items segun el catalogo que entremos
	//segun el catalogo es la coleccion que se cargara en el objeto shopItemService
	public ShopItemController(final ShopItemService shopItemService) {

		get("/kids-party-items", (req, res) -> shopItemService.getAllShopItems("Fiesta Infantil"), json());
		get("/xvs-party-items", (req, res) -> shopItemService.getAllShopItems("VX"), json());
		get("/dead-day-items", (req, res) -> shopItemService.getAllShopItems("Dia De Muertos"), json());
	}
}