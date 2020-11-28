import Connection.Mongo;

import Controllers.EventController;
import Services.EventService;
import Controllers.PageController;
import Services.PageService;

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

        /*Page Controller ref: Controllers.PageService*/
        new PageController(new PageService());

        /*Event Controller ref: Controllers.EventService*/
        new EventController(new EventService());

        after((req, res) -> {
            res.type("application/json");
        });
    }

    static int getHerokuAssignedPort() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        if (processBuilder.environment().get("PORT") != null) {
            return Integer.parseInt(processBuilder.environment().get("PORT"));
        }
        return 5012;
    }
}

/*
cls && mvn compile && mvn exec:java -D"exec.mainClass"="App"
*

/*
mvn clean compile assembly:single
*/