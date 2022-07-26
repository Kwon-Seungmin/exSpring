package com.Board.control;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestParam;

import com.Board.dto.MmbrDTO;
import com.Board.dto.RestDTO;
import com.Board.dto.RestMenuDTO;
import com.Board.service.LunchService;
import com.Board.service.MenuService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class LunchController {

	final LunchService lunchService;
	final MenuService menuService;

	// 전체 불러오기(사용X)
	@GetMapping("/rest")
	public ResponseEntity<?> getRestList(HttpServletRequest request) {
		List<RestDTO> list = new ArrayList<>(lunchService.getRestList());
		return ResponseEntity.ok(list);
	}

	// 멤버불러오기
	@GetMapping("/member")
	public ResponseEntity<?> getMmbrList(MmbrDTO member) {
		List<MmbrDTO> List1 = new ArrayList<>(lunchService.getMmbrList());
		return ResponseEntity.ok(List1);
	}

	// 검색_식당이름

	@GetMapping("search")
	public ResponseEntity<?> searchRest(@RequestParam String searchRest) {
		List<RestDTO> list = new ArrayList<>(lunchService.searchRest(searchRest));
		return ResponseEntity.ok(list);
	}

	// 선호도추천_멤버
	@GetMapping("/recommend/point")
	public ResponseEntity<?> recommendByPoint_Member(@RequestParam String[] checkedMembers) {
		List<RestDTO> list = new ArrayList<>(lunchService.recommendByPoint_Member(checkedMembers));
		return ResponseEntity.ok(list);
	}

	// 거리순추천_멤버
	@GetMapping("/recommend/distance")
	public ResponseEntity<?> recommendByDistance_Member(@RequestParam String[] checkedMembers) {
		List<RestDTO> list = new ArrayList<>(lunchService.recommendByDistance_Member(checkedMembers));
		return ResponseEntity.ok(list);
	}

	// 선호도추천_카테고리
	@GetMapping("/recommend/point2")
	public ResponseEntity<?> recommendByPoint_Category(@RequestParam String[] checkedMembers,
			@RequestParam String restCategory) {
		Map<String, Object> param = new HashMap<>();
		param.put("checkedMembers", checkedMembers);
		param.put("restCategory", restCategory);
		param.get("checkedMembers");
		List<RestDTO> list = new ArrayList<>(lunchService.recommendByPoint_Category(param));

		return ResponseEntity.ok(list);
	}

	// 거리순추천_카테고리
	@GetMapping("/recommend/distance2")
	public ResponseEntity<?> recommendByDistance_Category(@RequestParam String[] checkedMembers,
			@RequestParam String restCategory) {
		Map<String, Object> param = new HashMap<>();
		param.put("checkedMembers", checkedMembers);
		param.put("restCategory", restCategory);

		List<RestDTO> list = new ArrayList<>(lunchService.recommendByDistance_Category(param));
		return ResponseEntity.ok(list);
	}

	// 카테고리 불러오기
	@GetMapping("/category")
	public ResponseEntity<?> getCategoryList(RestDTO restCategory) {
		List<RestDTO> list = new ArrayList<>(lunchService.getCategoryList());
		return ResponseEntity.ok(list);
	}

	// 카테고리별 식당 불러오기
	@GetMapping("/category/filter")
	public ResponseEntity<?> restByCategory(@RequestParam String restCategory) {
		List<RestDTO> list = new ArrayList<>(lunchService.restByCategory(restCategory));
		return ResponseEntity.ok(list);
	}

	// 식당메뉴 불러오기
	@GetMapping("/restmenu")
	public ResponseEntity<?> getRestMenu(@RequestParam String restId) {
		List<RestMenuDTO> list = new ArrayList<>(menuService.getRestMenu(restId));
		return ResponseEntity.ok(list);
	}

}
