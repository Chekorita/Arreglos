package Services;

import spark.Response;
import static spark.Spark.*;

/* Objeto de conexión a mongo */
import Connection.Mongo;

import org.bson.Document;
import com.mongodb.client.MongoCollection;

public class OrderService {

    public Response sendOrder(Response res, String order) {
	//Se crea un objeto de tipo Mongo 
        Mongo conn = new Mongo();
	String data = "";
        //se crea un document con la infromacion del orden que incluira toda la infromacion solicitada	
        Document orderData = Document.parse(order);
	//se manda a llamar una conexion a la base de datos
        conn.connect();
	//se crea un objeto de tipo mongocollection pero en formato document, esto haciendo referencia a la coleccion Orders de nuestra base de datos		        
        MongoCollection<Document> collection = conn.getCollection("Orders");
	//insertamos documento en la coleccion creada
        collection.insertOne(orderData);
	//cerramos la conexion
        conn.disconnect();

        res.status(200);

        return res;
    }
}