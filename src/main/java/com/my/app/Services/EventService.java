package Services;

/* Modelo del objeto evento */
import Objects.Event;
/* Objeto de conexión a mongo */
import Connection.Mongo;

import java.util.*;

import org.bson.Document;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.FindIterable;

public class EventService {

	public List<Event> getAllEvents() {

        List<Event> events = new ArrayList<Event>();

        Mongo conn = new Mongo();
		String data = "";
        
        conn.connect();
        
        MongoCollection<Document> collection = conn.getCollection("Eventos");
        FindIterable<Document> result = collection.find();
        
        for(Document doc: result) {

            Event event = new Event();

            event.setID(doc.get("_id").toString());
            event.setText(doc.get("text").toString());
            event.setSrc(doc.get("src").toString());
            event.setRef(doc.get("ref").toString());
            event.setPosition(Integer.parseInt(doc.get("position").toString()));

            events.add(event);
        }

        conn.disconnect();

	   return events;
    }
}