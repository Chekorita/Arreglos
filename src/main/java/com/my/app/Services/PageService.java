package Services;

import Objects.Page;
import spark.Response;
import static spark.Spark.*;

public class PageService {

	Page page;
	//Se crea un objeto tipo Page y este va a tener la informacion que se mande a este metodo
	//con el metodo lo que hacemos es redirigir al html cargado
	public void loadPage(Response response, String src) {
		this.page = new Page(src);
		response.redirect(page.getSrc());
	}
}