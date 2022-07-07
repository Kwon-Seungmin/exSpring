package com.Board.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.Board.dto.RestDTO;
import com.Board.dto.PrefDTO;

@Mapper
public interface RestMapper {
	List<RestDTO> selectRestList();

	List<RestDTO> selectLunch(String[] checkedMembers);

	List<RestDTO> searchRest(String searchRest);

	List<RestDTO> recommendPoint(String[] checkedMembers);

	List<RestDTO> recommendDistance(String[] checkedMembers);

	List<RestDTO> recommendPoint2(Map<String, Object> param);

	List<RestDTO> recommendDistance2(Map<String, Object> param);

	List<RestDTO> categoryList();

	List<RestDTO> selectCategory(String restCategory);
}
