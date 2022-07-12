package com.Board.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.Board.dto.MmbrDTO;
import com.Board.dto.RestMenuDTO;
import com.Board.mapper.MemberMapper;
import com.Board.mapper.RestMenuMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MenuServiceImpl implements MenuService{

	private final RestMenuMapper mapper;

	@Override
	public List<RestMenuDTO> selectRestMenu(String restId) {
		return mapper.selectRestMenu(restId);
	}
}
