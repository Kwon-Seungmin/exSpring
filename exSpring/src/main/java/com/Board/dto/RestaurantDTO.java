package com.Board.dto;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("RestDTO")
@Getter
@Setter
public class RestDTO {
//	rest 테이블
	String restId;
	String restName;
	String restAddr;
	String restTel;
	String restTime;
	String restCategory;
	String restLink;
	String restLon;
	String restLat;
	String restLast;
}
