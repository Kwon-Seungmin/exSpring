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
public class LunchServiceImpl implements LunchService {

	private final RestMapper mapper;

	private final MemberMapper mmapper;

	@Override
	public List<RestDTO> getRestList() {
		return mapper.getRestList();
	}

	@Override
	public List<MmbrDTO> getMmbrList() {
		return mmapper.getMmbrList();
	}

	public List<RestDTO> searchRest(String searchRest) {
		return mapper.searchRest(searchRest);
	}

	public List<RestDTO> recommendByPoint_Member(String[] checkedMembers) {
		return mapper.recommendByPoint_Member(checkedMembers);
	}

	public List<RestDTO> recommendByDistance_Member(String[] checkedMembers) {
		return mapper.recommendByDistance_Member(checkedMembers);
	}

	public List<RestDTO> recommendByPoint_Category(Map<String, Object> param) {
		return mapper.recommendByPoint_Category(param);
	}

	public List<RestDTO> recommendByDistance_Category(Map<String, Object> param) {
		return mapper.recommendByDistance_Category(param);
	}

	public List<RestDTO> getCategoryList() {
		return mapper.getCategoryList();
	}

	public List<RestDTO> restByCategory(String restCategory) {
		return mapper.restByCategory(restCategory);
	}
}
