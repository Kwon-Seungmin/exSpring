package com.Board.service;

import java.util.List;
import java.util.Map;

import com.Board.dto.MmbrDTO;
import com.Board.dto.RestDTO;

public interface LunchService {

	public List<RestDTO> getRestList();

	public List<MmbrDTO> getMmbrList();

	public List<RestDTO> searchRest(String searchRest);

	public List<RestDTO> recommendByPoint_Member(String[] checkedMembers);

	public List<RestDTO> recommendByDistance_Member(String[] checkedMembers);

	public List<RestDTO> recommendByPoint_Category(Map<String, Object> param);

	public List<RestDTO> recommendByDistance_Category(Map<String, Object> param);

	public List<RestDTO> getCategoryList();

	public List<RestDTO> restByCategory(String restCategory);
}
