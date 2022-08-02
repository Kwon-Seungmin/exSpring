package com.Board.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.Board.dto.MenuDTO;
import com.Board.mapper.MenuMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MenuService {

	private final MenuMapper mapper;

	// 메뉴리스트 호출
	public List<MenuDTO> getRestMenu(String restId) {
		return mapper.getRestMenu(restId);
	};
}
