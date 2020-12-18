package Objects;

public class ShopItem {

	private String id = "";
	private String name = "";
	private String type = "";
	private String size = "";
	private int pieces = 0;
	private int price = 0;
	private String src = "";

	// Getters
	public String getID() {
		return this.id;
	}

	public String getName() {
		return this.name;
	}

	public String getType() {
		return this.type;
	}
	
	public String getSize() {
		return this.size;
	}

	public int getPieces() {
		return this.pieces;
	}

	public int getPrice() {
		return this.price;
	}

	public String getSrc() {
		return this.src;
	}

	// Setters
	public void setID(String id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setType(String type) {
		this.type = type;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public void setPieces(int pieces) {
		this.pieces = pieces;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public void setSrc(String src) {
		this.src = src;
	}
}