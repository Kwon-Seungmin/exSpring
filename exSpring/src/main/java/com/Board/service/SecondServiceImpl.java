package com.Board.service;

import java.util.List;


import org.springframework.stereotype.Service;

import com.Board.dto.RestDTO;
import com.Board.mapper.RestMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class SecondServiceImpl implements SecondService{


	private final RestMapper mapper;

	@Override
	public List<RestDTO> restList() {
		return mapper.selectRestList();
	}
}
