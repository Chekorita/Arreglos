package Objects;

public class Page {

	private String src;
	//la clase Page guarda la ubicacion de donde se encuentran los html de las paginas
	public Page(String src) {
		this.src = src;
	}
	//set y get correspondientes a la variable src
	public void setSrc(String src) {
		this.src = src;
	}

	public String getSrc() {
		return this.src;
	}
}