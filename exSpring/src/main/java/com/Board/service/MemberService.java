package com.Board.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.Board.dto.MemberDTO;
import com.Board.mapper.MemberMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
	private final MemberMapper mapper;

	public List<MemberDTO> getMemberList() {
		return mapper.getMemberList();
	}
}
