package com.Board.service;

import java.util.List;
import java.util.Map;

import com.Board.dto.MmbrDTO;
import com.Board.dto.RestDTO;

public interface LunchService {
	public List<RestDTO> restList();

	public List<MmbrDTO> memberList();

	public List<RestDTO> searchRest(String searchRest);

	public List<RestDTO> recommendPoint(String[] checkedMembers);

	public List<RestDTO> recommendDistance(String[] checkedMembers);

	public List<RestDTO> recommendPoint2(Map<String, Object> param);

	public List<RestDTO> recommendDistance2(Map<String, Object> param);

	public List<RestDTO> categoryList();

	public List<RestDTO> selectCategory(String restCategory);
}
