package com.Board.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.Board.dto.RestaurantDTO;
import com.Board.dto.SearchDTO;
import com.Board.mapper.RestaurantMapper;

import lombok.RequiredArgsConstructor;

@Service

@RequiredArgsConstructor
public class RestaurantService {
	private final RestaurantMapper mapper;

	public List<RestaurantDTO> getRestList() {
		return mapper.getRestList();
	}

	public List<RestaurantDTO> searchRest(String searchRest) {
		return mapper.searchRest(searchRest);
	}

	public List<RestaurantDTO> recommendByPoint_Member(String[] checkedMemberList) {
		return mapper.recommendByPoint_Member(checkedMemberList);
	}

	public List<RestaurantDTO> recommendByDistance_Member(String[] checkedMemberList) {
		return mapper.recommendByDistance_Member(checkedMemberList);
	}

	public List<RestaurantDTO> recommendByPoint_Category(Map<String, Object> param) {
		return mapper.recommendByPoint_Category(param);
	}

	public List<RestaurantDTO> recommendByDistance_Category(SearchDTO search) {
		return mapper.recommendByDistance_Category(search);
	}

	public List<RestaurantDTO> getCategoryList() {
		return mapper.getCategoryList();
	}

}
