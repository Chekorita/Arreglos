package Controllers;

import static Utils.JsonUtil.*;
import static spark.Spark.*;

import Services.EventService;

public class EventController {
	
	public EventController(final EventService eventService) {
		get("/events", (req, res) -> eventService.getAllEvents(), json());
	}
}