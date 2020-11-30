package Utils;

import spark.ResponseTransformer;
import com.google.gson.Gson;

public class JsonUtil {
	public static String toJson(Object obj) {
		return new Gson().toJson(obj);
	}

	public static ResponseTransformer json() {
		return JsonUtil::toJson;
	}
}