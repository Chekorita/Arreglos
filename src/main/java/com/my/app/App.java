import static spark.Spark.*;

public class App {

    public static void main(String[] args) {

        port(getHerokuAssignedPort());

        String projectDir = System.getProperty("user.dir");
        staticFiles.externalLocation(projectDir + "/src/main/resources/public");
        get("/", (req, res) -> {
            res.redirect("index.html");
            return null;
        });
    }

    static int getHerokuAssignedPort() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        if (processBuilder.environment().get("PORT") != null) {
            return Integer.parseInt(processBuilder.environment().get("PORT"));
        }
        
        return 8080;
    }
}

/*
cls && mvn compile && mvn exec:java -D"exec.mainClass"="App"
*

/*
mvn clean compile assembly:single
*/