package com.Board.dto;

import lombok.Getter;

@Getter
public class SearchDTO {
	String[] checkedMemberList;
	String restCategory;

	public SearchDTO(String[] checkedMemberList, String restCategory) {
		this.checkedMemberList = checkedMemberList;
		this.restCategory = restCategory;
	}

}
