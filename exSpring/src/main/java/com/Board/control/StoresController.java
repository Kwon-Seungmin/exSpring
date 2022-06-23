package com.Board.control;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StoresController {
	@GetMapping("/api")
	public String callApi() throws IOException {
		StringBuilder result = new StringBuilder();



		String urlStr = "http://bigdata.daejeon.go.kr/api/stores?"
				+ "page=1" ;
		URL url = new URL(urlStr);


		HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
		urlConnection.setRequestMethod("GET");

		BufferedReader br;

		br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "UTF-8"));

		String returnLine;

		while((returnLine = br.readLine()) != null) {
			result.append(returnLine+"\n\r");

		}

		urlConnection.disconnect();


	return result.toString();



	}

}
