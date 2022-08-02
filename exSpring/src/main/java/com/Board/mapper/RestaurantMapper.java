package com.Board.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.Board.dto.RestaurantDTO;
import com.Board.dto.SearchDTO;

@Mapper
public interface RestaurantMapper {
	List<RestaurantDTO> getRestList();

	List<RestaurantDTO> searchRest(String searchRest);

	List<RestaurantDTO> recommendByPoint_Member(String[] checkedMemberList);

	List<RestaurantDTO> recommendByDistance_Member(String[] checkedMembersList);

	List<RestaurantDTO> recommendByPoint_Category(Map<String, Object> param);

	List<RestaurantDTO> recommendByDistance_Category(SearchDTO search);

	List<RestaurantDTO> getCategoryList();


}
