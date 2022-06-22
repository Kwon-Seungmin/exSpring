package com.Board.control;

import java.util.List;

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
@RequestMapping("/second")
public class SecondController {
	private final SecondService secondService;

	@GetMapping("/rest")
	public ResponseEntity<List<RestDTO>> getSecond(){
		List<RestDTO> result = secondService.hello();
		return new ResponseEntity<List<RestDTO>>(result, HttpStatus.OK);
	}


}
