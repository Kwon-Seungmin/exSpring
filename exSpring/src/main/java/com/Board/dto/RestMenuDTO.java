package com.Board.dto;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

@Alias("RestMenuDTO")
@Getter
@Setter
public class RestMenuDTO {
	String restId;
	String menuId;
	String menu;
	String price;

}
