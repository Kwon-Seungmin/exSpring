package com.Board.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.Board.dto.RestDTO;

@Mapper
public interface RestMapper {
	List<RestDTO> getRestList();

	List<RestDTO> searchRest(String searchRest);

	List<RestDTO> recommendByPoint_Member(String[] checkedMembers);

	List<RestDTO> recommendByDistance_Member(String[] checkedMembers);

	List<RestDTO> recommendByPoint_Category(Map<String, Object> param);

	List<RestDTO> recommendByDistance_Category(Map<String, Object> param);

	List<RestDTO> getCategoryList();

	List<RestDTO> restByCategory(String restCategory);
}
