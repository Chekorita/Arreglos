package Controllers;

import static spark.Spark.*;

import Services.PageService;

public class PageController {
	public PageController(final PageService pageService) {

		get("/", (req, res) -> {
			pageService.loadPage(res, "index.html");
			return null;
		});

		get("/designs", (req, res) -> {
			pageService.loadPage(res, "designs/index.html");
			return null;
		});

		get("/contact", (req, res) -> {
			pageService.loadPage(res, "contact/index.html");
			return null;
		});

		get("/catalogue/:page", (req, res) -> {
			pageService.loadPage(res, "catalogue/" + req.params("page") + "/index.html");
			return null;
		});
	}
}