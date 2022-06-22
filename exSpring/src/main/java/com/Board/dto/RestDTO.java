package com.Board.dto;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("RestDTO")
@Getter
@Setter
public class RestDTO {
	String rest_id;
	String rest_name;
	String rest_addr;
	String rest_tel;
	String rest_time;
	String rest_category;
	String rest_link;
	String rest_lon;
	String rest_lat;
	String rest_last;
}
