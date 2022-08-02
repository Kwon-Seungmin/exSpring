package com.Board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.Board.dto.MenuDTO;

@Mapper
public interface MenuMapper {
	List<MenuDTO> getRestMenu(String restId);

}
