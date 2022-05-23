package com.Board.service;

import java.util.List;

import com.Board.dto.BoardDto;

public interface BoardService {
	List<BoardDto> selectBoardList() throws Exception;
}
