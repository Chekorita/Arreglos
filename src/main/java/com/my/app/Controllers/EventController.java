package Controllers;

import static Utils.JsonUtil.*;
import static spark.Spark.*;

import Services.EventService;

public class EventController {
	//llama informacion de los catalogos que se presentaran, esto con ayuda del objeto eventService
	public EventController(final EventService eventService) {
		get("/events", (req, res) -> eventService.getAllEvents(), json());
	}
}