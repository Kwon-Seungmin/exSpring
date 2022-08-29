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

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("restaurant")
public class LunchController {

	final RestaurantService restaurantService;

	// 검색_식당이름
	@GetMapping("/search")
	public ResponseEntity<?> selectRestaurantByName(@RequestParam String rest) {
		List<RestaurantDTO> list = restaurantService.selectRestaurantByName(rest);
		return ResponseEntity.ok(list);
	}

	// 선호도추천_멤버
	@GetMapping("/point/member")
	public ResponseEntity<?> selectRestaurantByPointAndMember(@RequestParam String[] lunchMemberList) {
		List<RestaurantDTO> list = restaurantService.selectRestaurantByPointAndMember(lunchMemberList);
		return ResponseEntity.ok(list);
	}

	// 거리순추천_멤버
	@GetMapping("/distance/member")
	public ResponseEntity<?> selectRestaurantByDistanceAndMember(@RequestParam String[] lunchMemberList) {
		List<RestaurantDTO> list = restaurantService.selectRestaurantByDistanceAndMember(lunchMemberList);
		return ResponseEntity.ok(list);
	}

	// 선호도추천_카테고리
	@GetMapping("/point/category")
	public ResponseEntity<?> selectRestaurantByPointAndCategory(@RequestParam String[] lunchMemberList,
			@RequestParam String restCategory) {

		SearchDTO search = new SearchDTO(lunchMemberList, restCategory);
		List<RestaurantDTO> list = restaurantService.selectRestaurantByPointAndCategory(search);
		return ResponseEntity.ok(list);
	}

	// 거리순추천_카테고리
	@GetMapping("/distance/category")
	public ResponseEntity<?> selectRestaurantByDistanceAndCategory(@RequestParam String[] lunchMemberList,
			@RequestParam String restCategory) {
		SearchDTO search = new SearchDTO(lunchMemberList, restCategory);
		List<RestaurantDTO> list = restaurantService.selectRestaurantByDistanceAndCategory(search);
		System.out.println(list);
		return ResponseEntity.ok(list);
	}

	// 카테고리 불러오기
	@GetMapping("/category")
	public ResponseEntity<?> selectCategoryList() {
		List<RestaurantDTO> list = restaurantService.selectCategoryList();
		return ResponseEntity.ok(list);
	}

}
