package Services;

import Objects.Page;
import spark.Response;
import static spark.Spark.*;

public class PageService {

	Page page;

	public void loadPage(Response response, String src) {
		this.page = new Page(src);
		response.redirect(page.getSrc());
	}
}