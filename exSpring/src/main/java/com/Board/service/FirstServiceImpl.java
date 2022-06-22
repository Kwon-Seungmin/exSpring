package com.Board.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.Board.dto.MmbrDTO;
import com.Board.mapper.MemberMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FirstServiceImpl implements FirstService{

	private final MemberMapper mapper;

	@Override
	public List<MmbrDTO> helloWorld() {
		return mapper.selectMmbrList();
	}
}
