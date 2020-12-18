package Services;

import spark.Response;
import static spark.Spark.*;

/* Objeto de conexión a mongo */
import Connection.Mongo;

import org.bson.Document;
import com.mongodb.client.MongoCollection;

public class OrderService {

    public Response sendOrder(Response res, String order) {

        Mongo conn = new Mongo();
	String data = "";
        	
        Document orderData = Document.parse(order);

        conn.connect();
        
        MongoCollection<Document> collection = conn.getCollection("Orders");
        collection.insertOne(orderData);

        conn.disconnect();

        res.status(200);

        return res;
    }
}