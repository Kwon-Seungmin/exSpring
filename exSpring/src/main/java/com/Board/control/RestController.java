package com.Board.control;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.Board.dto.MmbrDTO;
import com.Board.dto.RestDTO;
import com.Board.mapper.RestMapper;
import com.Board.service.SecondService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class RestController {

	final SecondService secondService;

	@RequestMapping("/list.do")
	public ResponseEntity<List<RestDTO>> list(ModelAndView mav) {
		List<RestDTO> list = secondService.restList();
		return new ResponseEntity<List<RestDTO>>(list, HttpStatus.OK);
	}
}
