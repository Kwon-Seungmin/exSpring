package com.Board.control;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Board.dto.RestaurantDTO;
import com.Board.dto.SearchDTO;
import com.Board.service.RestaurantService;
import com.Board.service.MenuService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("restaurant")
public class LunchController {

	final RestaurantService restaurantService;

	final MenuService menuService;

	// 검색_식당이름
	@GetMapping("/search")
	public ResponseEntity<?> searchRest(@RequestParam String rest) {
		List<RestaurantDTO> list = restaurantService.searchRest(rest);
		return ResponseEntity.ok(list);
	}

	// 선호도추천_멤버
	@GetMapping("/point/member")
	public ResponseEntity<?> recommendByPoint_Member(@RequestParam String[] checkedMemberList) {
		List<RestaurantDTO> list = restaurantService.recommendByPoint_Member(checkedMemberList);
		return ResponseEntity.ok(list);
	}

	// 거리순추천_멤버
	@GetMapping("/distance/member")
	public ResponseEntity<?> recommendByDistance_Member(@RequestParam String[] checkedMemberList) {
		List<RestaurantDTO> list = restaurantService.recommendByDistance_Member(checkedMemberList);
		return ResponseEntity.ok(list);
	}

	// 선호도추천_카테고리
	@GetMapping("/point/category")
	public ResponseEntity<?> recommendByPoint_Category(@RequestParam String[] checkedMemberList,
			@RequestParam String restCategory) {
		Map<String, Object> param = new HashMap<>();
		param.put("checkedMemberList", checkedMemberList);
		param.put("restCategory", restCategory);
		List<RestaurantDTO> list = restaurantService.recommendByPoint_Category(param);
		return ResponseEntity.ok(list);
	}

	// 거리순추천_카테고리
	@GetMapping("/distance/category")
	public ResponseEntity<?> recommendByDistance_Category(@RequestParam String[] checkedMemberList,
			@RequestParam String restCategory) {
		SearchDTO search = new SearchDTO(checkedMemberList, restCategory);
		List<RestaurantDTO> list = restaurantService.recommendByDistance_Category(search);
		System.out.println(list);
		return ResponseEntity.ok(list);
	}

	// 카테고리 불러오기
	@GetMapping("/category")
	public ResponseEntity<?> getCategoryList() {
		List<RestaurantDTO> list = restaurantService.getCategoryList();
		return ResponseEntity.ok(list);
	}

}
