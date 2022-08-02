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


	public List<RestaurantDTO> selectRestaurantByName(String searchRest) {
		return mapper.selectRestaurantByName(searchRest);
	}

	public List<RestaurantDTO> selectRestaurantByPointAndMember(String[] checkedMemberList) {
		return mapper.selectRestaurantByPointAndMember(checkedMemberList);
	}

	public List<RestaurantDTO> selectRestaurantByDistanceAndMember(String[] checkedMemberList) {
		return mapper.selectRestaurantByDistanceAndMember(checkedMemberList);
	}

	public List<RestaurantDTO> selectRestaurantByPointAndCategory(SearchDTO search) {
		return mapper.selectRestaurantByPointAndCategory(search);
	}

	public List<RestaurantDTO> selectRestaurantByDistanceAndCategory(SearchDTO search) {
		return mapper.selectRestaurantByDistanceAndCategory(search);
	}

	public List<RestaurantDTO> selectCategoryList() {
		return mapper.selectCategoryList();
	}

}
