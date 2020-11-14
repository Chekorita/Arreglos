package com.my.app;

import static spark.Spark.*;
import java.util.Map;

/**
 * Hello world!
 *
 */
public class App {

    public static void main( String[] args ) {

        Map<String,String> env = System.getenv();

        int port = Integer.parseInt(env.get("PORT"));
    	port(port);

    	String projectDir = System.getProperty("user.dir");
    	String staticDir = "/src/main/resources/public";
    	staticFiles.externalLocation(projectDir + staticDir);

    	get("/", (req, res) -> {
            res.redirect("index.html");
            return null;
        });
    }
}

/* Run with: 

cls && mvn compile && mvn exec:java -D"exec.mainClass"="com.my.app.App"

*/

/* Compile with:

	mvn clean compile assembly:single

*/