package com.Board.control;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Board.dto.MmbrDTO;
import com.Board.service.FirstService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/first")
public class FirstController {
	private final FirstService firstService;

	@GetMapping("/0001")
	 public ResponseEntity<List<MmbrDTO>> getFirst(){
        List<MmbrDTO> result = firstService.helloWorld();
        return new ResponseEntity<List<MmbrDTO>>(result, HttpStatus.OK);

	}

}
