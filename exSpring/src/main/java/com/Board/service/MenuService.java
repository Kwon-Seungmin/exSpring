package com.Board.service;

import java.util.List;

import com.Board.dto.MmbrDTO;
import com.Board.dto.RestMenuDTO;

public interface MenuService {
	//메뉴리스트 호출
	public List<RestMenuDTO> getRestMenu(String restId);
}
