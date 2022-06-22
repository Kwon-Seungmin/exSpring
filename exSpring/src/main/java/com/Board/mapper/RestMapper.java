package com.Board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.Board.dto.RestDTO;

@Mapper
public interface RestMapper {

	List<RestDTO> selectRestList();
}
