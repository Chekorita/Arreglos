package Utils;

import spark.ResponseTransformer;
import com.google.gson.Gson;

public class JsonUtil {
	//para los json
	public static String toJson(Object obj) {
		return new Gson().toJson(obj);
	}

	public static ResponseTransformer json() {
		return JsonUtil::toJson;
	}
}