package Connection;

import org.bson.Document;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class Mongo {
	
	private MongoClientURI uri;
	private MongoClient mongoClient;
	private MongoDatabase database;

	public void connect() {
		this.uri = new MongoClientURI("mongodb+srv://Cesar:846279@cluster0.cgsce.mongodb.net/ProjectA?retryWrites=true&w=majority");
		this.mongoClient = new MongoClient(this.uri);
		this.database = this.mongoClient.getDatabase("ProjectA");
	}

	public void disconnect() {
		this.mongoClient.close();
	}

	public MongoCollection getCollection(String name) {
		MongoCollection<Document> collection = this.database.getCollection(name);
		return collection;
	}
}