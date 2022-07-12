package com.Board.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.Board.dto.MmbrDTO;
import com.Board.dto.RestDTO;
import com.Board.mapper.RestMapper;
import com.Board.mapper.MemberMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LunchServiceImpl implements LunchService{


	private final RestMapper mapper;

	private final MemberMapper mmapper;

	@Override
	public List<RestDTO> restList() {
		return mapper.selectRestList();
	}

	@Override
	public List<MmbrDTO> memberList() {
		return mmapper.selectMmbrList();
	}

	public List<RestDTO> searchRest(String searchRest) {
		return mapper.searchRest(searchRest);
	}

	public List<RestDTO> recommendPoint(String[] checkedMembers) {
		return mapper.recommendPoint(checkedMembers);
	}

	public List<RestDTO> recommendDistance(String[] checkedMembers) {
		return mapper.recommendDistance(checkedMembers);
	}

	public List<RestDTO> recommendPoint2(Map<String, Object> param) {
		return mapper.recommendPoint2(param);
	}

	public List<RestDTO> recommendDistance2(Map<String, Object> param) {
		return mapper.recommendDistance2(param);
	}


	public List<RestDTO> categoryList() {
		return mapper.categoryList();
	}

	public List<RestDTO> selectCategory(String restCategory) {
		return mapper.selectCategory(restCategory);
	}
}
