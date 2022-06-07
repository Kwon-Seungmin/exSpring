package com.Board.control;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.Board.dto.BoardDto;
import com.Board.service.BoardService;


@RequestMapping("/")
@Controller
public class BoardController {

	@Autowired
	private BoardService boardService;


//	@RequestMapping("/index")
//	public String index() {
//		return "index";
//	}

	@RequestMapping("/test")
	public String test(Model model) {
		model.addAttribute("test","이거슨 model로 가져온값이다!");
		return "test";
	}


//	@RequestMapping("/apple")
//	public ModelAndView openBoardList() throws Exception{
//			ModelAndView mv = new ModelAndView("/apple/boardList");
//
//			List<BoardDto> list = boardService.selectBoardList();
//			mv.addObject("list",list);
//
//			return mv;
//	}

//	@GetMapping("/fruit")
//	public String getFruit(Model model) {
//		Map<String, String> fruitmap = new HashMap<String, String>();
//		fruitmap.put("fruit1", "apple");
//		fruitmap.put("fruit2", "banana");
//		fruitmap.put("fruit3", "orange");
//		model.addAttribute("fruit", fruitmap);
//		return "/templates/fruit.html";
//	}
//
//	@GetMapping("/min")
//	public String getMin(Model model1) {
//		Map<String, String> minmap = new HashMap<String, String>();
//		return "min.html";
//	}



}
