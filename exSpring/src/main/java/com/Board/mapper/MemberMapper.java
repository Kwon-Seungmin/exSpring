package com.Board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.Board.dto.MemberDTO;

@Mapper
public interface MemberMapper {
	List<MemberDTO> getMemberList();

}
