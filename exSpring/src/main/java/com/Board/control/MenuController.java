package com.Board.control;

import java.util.List;
import java.util.ArrayList;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Board.dto.MenuDTO;
import com.Board.service.MenuService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class MenuController {

	final MenuService menuService;


	@GetMapping("/menu")
	public ResponseEntity<?> getRestMenu(@RequestParam String restId){
		List<MenuDTO> list = menuService.getRestMenu(restId);
		return ResponseEntity.ok(list);
	}


}
