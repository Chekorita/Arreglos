import Connection.Mongo;

import Controllers.*;
import Services.*;

import static spark.Spark.*;

import org.bson.Document;
import com.google.gson.Gson;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.FindIterable;

public class App {

    public static void main(String[] args) {
        
        port(getHerokuAssignedPort());

        String projectDir = System.getProperty("user.dir");
        staticFiles.externalLocation(projectDir + "/src/main/resources/public");

        /* Page Controller ref: Services.PageService */
        new PageController(new PageService());

        /* Event Controller ref: Services.EventService */
        new EventController(new EventService());

        /* ShopItemController ref: Services.ShopItemService */
        new ShopItemController(new ShopItemService());

        /* OrderController ref: Services.OrderService */
        new OrderController(new OrderService());

        after((req, res) -> {
            res.type("application/json");
        });
    }

    static int getHerokuAssignedPort() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        if (processBuilder.environment().get("PORT") != null) {
            return Integer.parseInt(processBuilder.environment().get("PORT"));
        }
        return 5212;
    }
}

/*
cls && mvn compile && mvn exec:java -D"exec.mainClass"="App"
*

/*
mvn clean compile assembly:single
*/