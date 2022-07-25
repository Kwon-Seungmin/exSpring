package com.Board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.Board.dto.MmbrDTO;

@Mapper
public interface MemberMapper {
	List<MmbrDTO> getMmbrList();

}
