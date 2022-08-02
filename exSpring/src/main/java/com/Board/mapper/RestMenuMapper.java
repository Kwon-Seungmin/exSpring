package com.Board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.Board.dto.RestMenuDTO;

@Mapper
public interface RestMenuMapper {
	List<RestMenuDTO> getRestMenu(String restId);

}