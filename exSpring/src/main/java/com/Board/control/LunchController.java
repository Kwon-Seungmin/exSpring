package com.Board.control;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.Board.dto.MmbrDTO;
import com.Board.dto.RestDTO;
import com.Board.service.LunchService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class LunchController {


	final LunchService lunchService;

	@RequestMapping("/map")
	public String vue() {
		return "lMap";
	}

	//전체 불러오기
	@GetMapping("/rest")
	public ResponseEntity<?> restList(HttpServletRequest request) {
		System.out.println(request.getAttribute("memberName"));

		List<RestDTO> list = new ArrayList<>(lunchService.restList());;

		return ResponseEntity.ok(list);
	}

	//연습1
	@GetMapping("/rest/hate")
	public ResponseEntity<?> selectLunch(@RequestParam String[] checkedMembers) {

		List<RestDTO> list = new ArrayList<>(lunchService.selectLunch(checkedMembers));

		return ResponseEntity.ok(list);
	}

	//추천_선호도
	@GetMapping("/recommend/point")
	public ResponseEntity<?> recommendPoint(@RequestParam String[] checkedMembers) {

		List<RestDTO> list = new ArrayList<>(lunchService.recommendPoint(checkedMembers));

		return ResponseEntity.ok(list);
	}

	//추천_거리순
	@GetMapping("/recommend/distance")
	public ResponseEntity<?> recommendDistance(@RequestParam String[] checkedMembers) {

		List<RestDTO> list = new ArrayList<>(lunchService.recommendDistance(checkedMembers));

		return ResponseEntity.ok(list);
	}

	@GetMapping("/recommend/point2")
	public ResponseEntity<?> recommendPoint2(@RequestParam String[] checkedMembers, @RequestParam String restCategory) {
		Map<String, Object> param = new HashMap<>();
		param.put("checkedMembers", checkedMembers);
		param.put("restCategory", restCategory);

		param.get("checkedMembers");
		List<RestDTO> list = new ArrayList<>(lunchService.recommendPoint2(param));

		return ResponseEntity.ok(list);
	}

	//추천_거리순
	@GetMapping("/recommend/distance2")
	public ResponseEntity<?> recommendDistance2(@RequestParam String[] checkedMembers, @RequestParam String restCategory) {
		Map<String, Object> param = new HashMap<>();
		param.put("checkedMembers", checkedMembers);
		param.put("restCategory", restCategory);

		List<RestDTO> list = new ArrayList<>(lunchService.recommendDistance2(param));

		return ResponseEntity.ok(list);
	}


	//검색
	@GetMapping("search")
	public ResponseEntity<?> searchRest(@RequestParam String searchRest) {

		List<RestDTO> list = new ArrayList<>(lunchService.searchRest(searchRest));

		return ResponseEntity.ok(list);
	}

	//멤버불러오기
	 @GetMapping("/member")
	 public ResponseEntity<?> memberList(MmbrDTO member) {
		 List<MmbrDTO> List1 = new ArrayList<>(lunchService.memberList());

		 return ResponseEntity.ok(List1);
	 }

	 //카테고리 가져오기
	 @GetMapping("/category")
	 public ResponseEntity<?> restCategory(RestDTO restCategory) {

		 List<RestDTO> list = new ArrayList<>(lunchService.categoryList());

		 return ResponseEntity.ok(list);
	 }

	 //카테고리별 호출
	 @GetMapping("/category/filter")
	 public ResponseEntity<?> selectCategory(@RequestParam String restCategory) {

		 List<RestDTO> list = new ArrayList<>(lunchService.selectCategory(restCategory));

		 return ResponseEntity.ok(list);
	 }



}
