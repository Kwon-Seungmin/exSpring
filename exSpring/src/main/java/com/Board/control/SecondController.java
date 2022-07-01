package com.Board.control;

import java.util.ArrayList;
import java.util.List;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Board.dto.RestDTO;
import com.Board.service.RestService;
import com.Board.service.SecondService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class SecondController {

	 final RestService restService;

	 final SecondService secondService;

		@RequestMapping("/map")
		public String vue() {
			return "lMap";
		}

	 @GetMapping("/rest")
	 public ResponseEntity<?> restList(RestDTO list) {

		List<RestDTO> List = new ArrayList<>(secondService.restList());

		return ResponseEntity.ok(List);
	 }


}
