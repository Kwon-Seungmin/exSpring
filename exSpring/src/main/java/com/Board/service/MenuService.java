package com.Board.service;

import java.util.List;

import com.Board.dto.MmbrDTO;
import com.Board.dto.RestMenuDTO;

public interface MenuService {
	public List<RestMenuDTO> selectRestMenu(String restId);
}
