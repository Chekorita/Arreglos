package Objects;

public class Event {
	
	private String id;
	private String text;
	private String src;
	private String ref;
	private int position;

	public Event() {
		this.id = "";
		this.text = "";
		this.src = "";
		this.ref = "";
		this.position = 0;
	}

	public void setID(String id) {
		this.id = id;
	}

	public void setText(String text) {
		this.text = text;
	}

	public void setSrc(String src) {
		this.src = src;
	}

	public void setRef(String ref) {
		this.ref = ref;
	}

	public void setPosition(int position) {
		this.position = position;
	}

	public String getID() {
		return this.id;
	}

	public String getText() {
		return this.text;
	}

	public String getSrc() {
		return this.src;
	}

	public String getRef() {
		return this.ref;
	}

	public int getPosition() {
		return this.position;
	}
}