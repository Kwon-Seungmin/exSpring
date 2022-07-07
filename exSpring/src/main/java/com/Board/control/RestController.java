package com.Board.control;

import com.Board.dto.LunchDTO;
import com.Board.dto.RestDTO;
import com.Board.service.LunchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Controller
@RequiredArgsConstructor
public class RestController {

	final LunchService secondService;

	@GetMapping("/list.do")
	public ResponseEntity<List<RestDTO>> list(ModelAndView mav) {
		List<RestDTO> list = secondService.restList();
		return new ResponseEntity<List<RestDTO>>(list, HttpStatus.OK);
	}

	@RequestMapping("/vue")
	public String vue() {
		return "vue";
	}

	@GetMapping("/lunch")
	public ResponseEntity<?> lunchList(LunchDTO lunch) {

		log.info("lunch = {}", lunch);

		List<LunchDTO> list = new ArrayList<>();
		list.add(LunchDTO.builder()
				.name("별일이네")
				.category("한식")
				.price(5000)
				.build());
		list.add(LunchDTO.builder()
				.name("칼국수집")
				.category("한식")
				.price(9000)
				.build());
		list.add(LunchDTO.builder()
				.name("동방불패")
				.category("중식")
				.price(10000)
				.build());
		list.add(LunchDTO.builder()
				.name("미소야")
				.category("일식")
				.price(8500)
				.build());
		list.add(LunchDTO.builder()
				.name("이탈리아 레스토랑")
				.category("양식")
				.price(15000)
				.build());

		String category = lunch.getCategory();
		List<LunchDTO> filterList = list.stream().filter(l -> {

			return category.equals("") || category.equals(l.getCategory());
		}).collect(Collectors.toList());

		return ResponseEntity.ok(filterList);
	}
}
