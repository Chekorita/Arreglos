package Services;

/* Modelo del objeto shop item */
import Objects.ShopItem;

/* Objeto de conexión a mongo */
import Connection.Mongo;

import java.util.*;

import org.bson.Document;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.FindIterable;

public class ShopItemService {

	// Método para obtener los items de mongo
	public List<ShopItem> getAllShopItems(String collectionName) {

        List<ShopItem> items = new ArrayList<ShopItem>();

        Mongo conn = new Mongo();
		String data = "";
        
        conn.connect();
        
        // Buscando la coleccion en mongo y obtener sus documentos
        MongoCollection<Document> collection = conn.getCollection(collectionName);
        FindIterable<Document> result = collection.find();
        
        // Seteando los resultados en la lista de items
        for(Document doc: result) {

            ShopItem item = new ShopItem();

            item.setID(doc.get("_id").toString());
            item.setName(doc.get("name").toString());
            item.setType(doc.get("type").toString());
            item.setSize(doc.get("size").toString());
            item.setPieces(Integer.parseInt(doc.get("pieces").toString()));
            item.setPrice(Integer.parseInt(doc.get("price").toString()));
            item.setSrc(doc.get("src").toString());

            items.add(item);
        }

        conn.disconnect();

	   return items;
    }
}