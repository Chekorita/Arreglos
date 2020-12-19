package Controllers;

import static spark.Spark.*;
import Services.OrderService;

public class OrderController {
	//este metodo recibe y envia a orderService la informacion de la orden solicitada
	public OrderController(final OrderService orderService) {
		post("/order", (req, res) -> orderService.sendOrder(res, req.body()));
	}
}