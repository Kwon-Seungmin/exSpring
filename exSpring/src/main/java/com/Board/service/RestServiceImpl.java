package com.Board.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.Board.dto.RestDTO;
import com.Board.mapper.RestMapper;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class RestServiceImpl implements RestService{

	private final RestMapper mapperR;

	public List<RestDTO> rest() {
		return mapperR.selectRest();
	}

}
