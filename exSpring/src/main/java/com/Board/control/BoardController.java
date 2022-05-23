package com.Board.control;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.Board.dto.BoardDto;
import com.Board.service.BoardService;

@Controller
public class BoardController {

	@Autowired
	private BoardService boardService;

	@RequestMapping("/apple")
	public ModelAndView openBoardList() throws Exception{
			ModelAndView mv = new ModelAndView("/apple/boardList");

			List<BoardDto> list = boardService.selectBoardList();
			mv.addObject("list",list);

			return mv;
	}

}
