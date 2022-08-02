package com.Board.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.Board.dto.RestaurantDTO;
import com.Board.dto.SearchDTO;

@Mapper
public interface RestaurantMapper {

	List<RestaurantDTO> selectRestaurantByName(String searchRest);

	List<RestaurantDTO> selectRestaurantByPointAndMember(String[] checkedMemberList);

	List<RestaurantDTO> selectRestaurantByDistanceAndMember(String[] checkedMembersList);

	List<RestaurantDTO> selectRestaurantByPointAndCategory(SearchDTO search);

	List<RestaurantDTO> selectRestaurantByDistanceAndCategory(SearchDTO search);

	List<RestaurantDTO> selectCategoryList();


}
