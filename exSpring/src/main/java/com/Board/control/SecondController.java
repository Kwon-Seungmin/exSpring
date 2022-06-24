package com.Board.control;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Board.dto.RestDTO;
import com.Board.service.SecondService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class SecondController {

	 final SecondService secondService;

	 @RequestMapping("/vuee")
	 public String vue() {
		 return "vueexam";

	 }

	 @GetMapping("/rest")
	 public ResponseEntity<?> restList(RestDTO list) {

		List<RestDTO> restList = secondService.restList();

		String category = list.getRestCategory();
		List<RestDTO> filterList = list.stream().filter(l -> {

			return category.equals("") || category.equals(l.getRestCategory());

		}).collect(Collectors.toList());

		return ResponseEntity.ok(filterList);


	 }


}
