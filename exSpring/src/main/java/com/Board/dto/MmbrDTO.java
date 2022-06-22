package com.Board.dto;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("MmbrDTO")
@Getter
@Setter
public class MmbrDTO {
	String userName;
	String userId;
	String userHate;

}
