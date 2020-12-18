package Controllers;

import static spark.Spark.*;
import Services.OrderService;

public class OrderController {
	public OrderController(final OrderService orderService) {
		post("/order", (req, res) -> orderService.sendOrder(res, req.body()));
	}
}