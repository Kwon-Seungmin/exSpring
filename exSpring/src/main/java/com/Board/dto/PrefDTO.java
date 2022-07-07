package com.Board.dto;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("prefDTO")
@Getter
@Setter
public class PrefDTO {
	String hateRestId;
	String likeRestId;
}
